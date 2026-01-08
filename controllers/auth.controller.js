const hash = require('../utils/hash.js');
const authRegisterController = async (req,res) => {
    try {
        const email = req.body.email;
        const hashedPassword = await hash(req.body.password);
        res.status(201).json({message:"Successfully Registered"});
    } catch (err) {
        res.status(500).json({message:"Error"});
        console.log(err);
    }

}

module.exports = authRegisterController;
