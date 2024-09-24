const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByUserId,
} = require("../controller/appointment.controller");


const { authenticate } = require("../middleware/auth.middlware");
// Create a new appointment
router.post("/",authenticate, createAppointment);
router.get("/doctor", authenticate, getAppointmentsByUserId);
// Get all appointments
router.get("/", getAppointments);

// get appoints by user id
// get appointments by user id


// Get a specific appointment by ID
router.get("/:id", getAppointmentById);

// Update an appointment by ID
router.put("/:id", updateAppointment);

// Delete an appointment by ID
router.delete("/:id", deleteAppointment);

module.exports = router;
