const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctor2.controller');
const { authenticate } = require("../middleware/auth.middlware");



router.get('/getAllDoctorsForHome', doctorController.getAllDoctorsForHome);
router.post('/searchDoctors', authenticate, doctorController.searchDoctors);
module.exports = router;

