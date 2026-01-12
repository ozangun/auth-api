const express = require('express');
const router = express.Router();
const {authRegisterController, authLoginController, authVerifyController, authResendVerificationController} = require('../controllers/auth.controller.js');
router.post('/register', authRegisterController);
router.post('/login', authLoginController);
router.post('/resend-verification', authResendVerificationController)
router.get('/verify', authVerifyController);

module.exports = router;
