const {isValidPassword, isValidEmail} = require("../utils/validator.js");
const {compare,hash} = require('../utils/hash.js');
const {createJwt} = require('../utils/jwt.js');
const resend = require('../utils/mail');
const createToken = require('../utils/token.js');
const db = require('../config/db.js');
const authRegisterController = async (req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;


        if(!email){
            return res.status(400).json({message:"Email is required"});
        }
        else if (!password){
            return res.status(400).json({message:"Password is required"});
        }
        else if (!isValidEmail(email)){
            return res.status(422).json({message:"Invalid email format"});
        }
        else if (!isValidPassword(password)){
            return res.status(422).json({message:"Password must be at least 8 charachters"});
        }
        else{
            const hashedPassword = await hash(password);
            const token = createToken();
            const verifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            await db.query('INSERT INTO users (email, password, verify_token , verify_expires) VALUES ($1, $2, $3, $4)',[email, hashedPassword, token, verifyExpires]);
            const verifyLink = `${process.env.BASE_URL}/auth/verify?token=${token}`;
           await resend.emails.send({
  from: 'Auth <onboarding@resend.dev>',
  to: email,
  subject: 'Verify your email',
  html: `<a href="${verifyLink}">Verify your email</a>`
});

            return res.status(201).json({message:"Successfully registered, please verify your email"});
        }
    } catch (err) {
        if(err.code==="23505"){
            return res.status(409).json({message:"This email is already in use"})
        }
        else {
            return res.status(500).json({message:"Error"});
        }
    }
}

const authLoginController = async (req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if(!email){
            return res.status(400).json({message:"Email is required"});
        }
        if (!password){
            return res.status(400).json({message:"Password is required"});
        }
        if (!isValidEmail(email)){
            return res.status(422).json({message:"Invalid email format"});
        }
        const userData = await db.query('SELECT id, password, is_verified from users WHERE email=$1', [email]);
        if (userData.rows.length === 0){
            return res.status(401).json({message:"Wrong email or password"});
        }
        if(userData.rows[0].is_verified === false){
            return res.status(403).json({message:"Please verify your email"});
        }
        if(await compare(password, userData.rows[0].password)){
            const token = createJwt(userData.rows[0].id);
            return res.status(200).json({message:"Successfully Logined",token:token});
        }
        else{
            return res.status(401).json({message:"Wrong email or password"});
        }
    } catch (err) {
        return res.status(500).json({message:"Error"});
    }
}

const authVerifyController = async (req,res) => {
   try {
    const token = req.query.token;
    if(!token){
        return res.status(400).json({message:"Token is required"})
    }
    const tokenData = await db.query("SELECT id, verify_expires from users WHERE verify_token=$1", [token]);
    if(tokenData.rows.length===0){
        return res.status(400).json({message:"Invalid token"});
    }
    if (new Date(tokenData.rows[0].verify_expires) < new Date()){
        return res.status(400).json({message:"Token expired"});
    }

    await db.query(`UPDATE users SET is_verified = true, verify_token = NULL, verify_expires = NULL WHERE id = $1`,[tokenData.rows[0].id]);
    return res.json({ message: 'Email verified successfully' });
   } catch (err) {
        return res.status(500).json({ message: 'Error' });
   }
}

const authResendVerificationController = async (req,res) => {
    try {
    const email = req.body.email;
    if(!email){
        return res.status(400).json({message:"Email is required"});
    }
    if (!isValidEmail(email)){
            return res.status(422).json({message:"Invalid email format"});
    }
    const data = await db.query('SELECT is_verified, verify_token, verify_expires from users WHERE email=$1',[email]);
    if(data.rows.length===0){
        return res.status(200).json({message:"A verification mail has been sent"});
    }
    if(data.rows[0].is_verified === true){
        return res.status(400).json({message:"Account already verified"});
    }
    const token = createToken();
    const verifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await db.query('UPDATE users SET verify_token=$1, verify_expires=$2 WHERE email=$3',[token, verifyExpires, email]);
            const verifyLink = `${process.env.BASE_URL}/auth/verify?token=${token}`;
           await resend.emails.send({
  from: 'Auth <onboarding@resend.dev>',
  to: email,
  subject: 'Verify your email',
  html: `<a href="${verifyLink}">Verify your email</a>`
});
    return res.status(200).json({message: "A verification mail has been sent"});
    } catch (error) {
        return res.status(500).json({message:'Error'});
    }

}

const authForgotPasswordController = async (req,res) => {
    try {
        const email = req.body.email;
    if(!email){
        return res.status(400).json({message:"Email is required"});
    }
    if (!isValidEmail(email)){
        return res.status(422).json({message:"Invalid email format"});
    }
    const userData = await db.query('SELECT email from users WHERE email=$1', [email]);
    if(userData.rows.length === 0){
        return res.status(200).json({message:"If this email exists, a reset link has been sent"});
    }
    if(email === userData.rows[0].email){
        const token = createToken();
        const resetExpires = new Date(Date.now() + 60 * 60 * 1000);
        await db.query('UPDATE users SET reset_token=$1 ,reset_expires=$2 WHERE email=$3',[token, resetExpires,email]);
        const resetLink = `${process.env.BASE_URL}/auth/reset-password?token=${token}`;
           await resend.emails.send({
  from: 'Auth <onboarding@resend.dev>',
  to: email,
  subject: 'Reset your password',
  html: `<a href="${resetLink}">Reset your password</a>`
});
        return res.status(200).json({
        message: "If this email exists, a reset link has been sent"
        });
    }
    } catch (error) {
        return res.status(500).json({message:"Error"});
    }
    
}

const authResetPasswordController = async (req,res) => {
    try {
    const token = req.body.token;
    if(!token){
        return res.status(400).json({message:"Token is required"})
    }
    const tokenData = await db.query("SELECT id,email, reset_expires from users WHERE reset_token=$1", [token]);
    if(tokenData.rows.length===0){
        return res.status(400).json({message:"Invalid token"});
    }
    if (new Date(tokenData.rows[0].reset_expires) < new Date()){
        return res.status(400).json({message:"Token expired"});
    }
    const newPassword = req.body.password;
    if (!newPassword){
        return res.status(400).json({message:"Password is required"});
    }
    if (!isValidPassword(newPassword)){
        return res.status(422).json({message:"Invalid password format"});
    }
    const hashedPassword = await hash(newPassword);
    await db.query("UPDATE users SET password=$1, reset_token=NULL, reset_expires=NULL WHERE reset_token=$2", [hashedPassword,token]);
    return res.status(201).json({ message: 'Password reset successfully' });
   } catch (err) {
        return res.status(500).json({ message: 'Error' });
   }
}
module.exports = {authRegisterController, authLoginController, authVerifyController, authResendVerificationController,authForgotPasswordController,authResetPasswordController};
