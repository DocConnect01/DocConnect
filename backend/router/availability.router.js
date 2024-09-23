const express = require('express');
const router = express.Router();
const {
  createAvailability,
  getDoctorAvailability,
  deleteAvailability,
} = require('../controller/availability.Controller');

router.post('/availability', createAvailability);

router.get('/availability/:DoctorID', getDoctorAvailability);

router.delete('/availability/:AvailabilityID', deleteAvailability);

module.exports = router;
