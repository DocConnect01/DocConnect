const express = require('express');
const router = express.Router();
const {
  createAvailability,
  getDoctorAvailability,
  deleteAvailability,
  getAvailableSlots,
} = require('../controller/availability.Controller');

router.post('/availability', createAvailability);

router.get('/availability/:DoctorID', getDoctorAvailability);

router.delete('/availability/:AvailabilityID', deleteAvailability);

router.get('/availability/slots/:DoctorID', getAvailableSlots);

module.exports = router;