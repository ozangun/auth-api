const db = require('../config/db.js');
const {isValidPassword} = require("../utils/validator.js");
const {compare,hash} = require('../utils/hash.js');
const getProfile = async (req,res) => {
    try {
        const data = await db.query('SELECT email, created_at from users WHERE id=$1', [req.user.userId])
        if (data.rows.length === 0) {
        return res.status(404).json({ message: 'User not found' });
        }
         res.json({
            message: "User informations",
            userId: req.user.userId,
            email: data.rows[0].email,
            createdAt: data.rows[0].created_at
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

const changePassword = async (req,res) => {
    try {
        const currentPassword = req.body.currentPassword;
        const newPassword = req.body.newPassword;
        if(!currentPassword){
            return res.status(400).json({message:"Password is required"});
        }
        if(!newPassword){
            return res.status(400).json({message:"Password is required"});
        }
        if(currentPassword===newPassword){
            return res.status(400).json({message:"Password cannot be same"});
        }
        if(!isValidPassword(newPassword)){
            return res.status(422).json({message:"Password must be at least 8 charachters"});
        }
       const userData = await db.query('SELECT password from users WHERE id=$1',[req.user.userId]);
       if (userData.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
       const comparePass = await compare(currentPassword,userData.rows[0].password);
       
       if (!comparePass){
        return res.status(401).json({message:"Wrong password"});
       }
        const newHashedPassword = await hash(newPassword);
        await db.query('UPDATE users SET password=$1 where id=$2',[newHashedPassword,req.user.userId]);
        return res.status(200).json({message:"Your password changed successfully"});
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {getProfile,changePassword};