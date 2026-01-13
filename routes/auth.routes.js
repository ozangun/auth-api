const express = require('express');
const router = express.Router();
const {authRegisterController, authLoginController, authVerifyController, authResendVerificationController, authForgotPasswordController,authResetPasswordController} = require('../controllers/auth.controller.js');
router.post('/register', authRegisterController);
router.post('/login', authLoginController);
router.post('/resend-verification', authResendVerificationController)
router.post('/forgot-password', authForgotPasswordController);
router.post('/reset-password', authResetPasswordController);
router.get('/verify', authVerifyController);

module.exports = router;
