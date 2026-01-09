const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const getProfile = require("../controllers/user.controller.js");

router.get('/profile',authMiddleware, getProfile);

module.exports = router;