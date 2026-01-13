const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const {getProfile,changePassword} = require("../controllers/user.controller.js");

router.get('/profile',authMiddleware, getProfile);
router.post('/change-password',authMiddleware, changePassword);

module.exports = router;