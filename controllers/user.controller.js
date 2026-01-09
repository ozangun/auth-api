const db = require('../config/db.js');
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

module.exports = getProfile;