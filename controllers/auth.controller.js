const {isValidPassword, isValidEmail} = require("../utils/validator.js");
const hash = require('../utils/hash.js');
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

module.exports = authRegisterController;
