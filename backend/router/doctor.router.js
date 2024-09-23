const express = require('express');
const router = express.Router();
const {authenticate } = require('../middleware/auth.middlware.js');
const doctorController = require('../controller/doctor.controller');


// Create a new doctor profile (Admin only)
router.post('/',  doctorController.createDoctorProfile);

// Get all doctor profiles (Admin only)
router.get('/',   doctorController.getDoctors);

// Get a single doctor profile by ID (Admin and Doctors)
router.get('/:id',  doctorController.getDoctorById);

// Update doctor profile (Admin and Doctors can update their own profiles)
router.put('/:id', doctorController.updateDoctorProfile);

// Delete a doctor profile (Admin only)
router.delete('/:id',   doctorController.deleteDoctorProfile);



module.exports = router;
