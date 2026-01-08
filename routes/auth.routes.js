const express = require('express');
const router = express.Router();
const authRegisterController = require('../controllers/auth.controller.js');

router.post('/register', authRegisterController);

module.exports = router;
