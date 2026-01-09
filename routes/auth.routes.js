const express = require('express');
const router = express.Router();
const {authRegisterController, authLoginController} = require('../controllers/auth.controller.js');
router.post('/register', authRegisterController);
router.post('/login', authLoginController);

module.exports = router;
