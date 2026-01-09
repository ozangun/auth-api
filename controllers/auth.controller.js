const {isValidPassword, isValidEmail} = require("../utils/validator.js");
const {compare,hash} = require('../utils/hash.js');
const {createJwt} = require('../utils/jwt.js');
const db = require('../config/db.js');
const authRegisterController = async (req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = await hash(password);
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
            await db.query('INSERT INTO users (email, password) VALUES ($1, $2)',[email, hashedPassword]);
            return res.status(201).json({message:"Successfully Registered"});
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
        const userData = await db.query('SELECT id, password from users WHERE email=$1', [email]);
        if (userData.rows.length === 0){
            return res.status(401).json({message:"Wrong email or password"});
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

module.exports = {authRegisterController, authLoginController};
