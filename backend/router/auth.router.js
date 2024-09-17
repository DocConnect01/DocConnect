const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/auth.controller');

// Register Doctor or Patient
router.post('/register', register);

// Login for Admin, Doctor, and Patient
router.post('/login', login);

module.exports = router;
