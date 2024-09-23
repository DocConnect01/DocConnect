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

// Create a new appointment
router.post("/", createAppointment);

// Get all appointments
router.get("/", getAppointments);

// get appoints by user id
router.post("/doctor", getAppointmentsByUserId);

// Get a specific appointment by ID
router.get("/:id", getAppointmentById);

// Update an appointment by ID
router.put("/:id", updateAppointment);

// Delete an appointment by ID
router.delete("/:id", deleteAppointment);

module.exports = router;
