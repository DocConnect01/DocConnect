const express = require('express');
const router = express.Router();
const appointmentController = require('../controller/appointment.controller');


router.get('/', appointmentController.getAllAppointments);
router.get('/doctor/:id', appointmentController.getAppointmentsByDoctorId);
router.get('/patient/:id', appointmentController.getAppointmentsByPatientId);
router.get('/date/:date', appointmentController.getAppointmentsByDate);
router.get('/time/:time', appointmentController.getAppointmentsByTime);
router.get('/status/:status', appointmentController.getAppointmentsByStatus);
router.get('/doctor/:id/date/:date', appointmentController.getAppointmentsByDoctorIdAndDate);
router.post('/', appointmentController.createAppointment);
router.get('/:id', appointmentController.getAppointmentById);
router.put('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);




module.exports = router;