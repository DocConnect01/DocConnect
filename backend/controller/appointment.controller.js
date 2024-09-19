// controllers/appointment.controller.js
const { Appointment } = require('../models');



// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments by doctor ID
exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { DoctorID: req.params.id }
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments by patient ID
exports.getAppointmentsByPatientId = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { PatientID: req.params.id }
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments by date
exports.getAppointmentsByDate = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { AppointmentDate: req.params.date }
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments by time
exports.getAppointmentsByTime = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { StartTime: req.params.time } 
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get appointments by status
exports.getAppointmentsByStatus = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { Status: req.params.status }
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments by doctor ID and date
exports.getAppointmentsByDoctorIdAndDate = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: {
        DoctorID: req.params.id,
        AppointmentDate: new Date(req.params.date)
      }
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments by patient ID and date
exports.getAppointmentsByPatientIdAndDate = async (req, res) => {
    try {
    const appointments = await Appointment.findAll({
    where: {
        PatientID: req.params.id,
        AppointmentDate: req.params.date
       }
    });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific appointment by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (appointment) {
      res.status(200).json(appointment);
    } else {
      res.status(404).json({ error: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an appointment by ID
exports.updateAppointment = async (req, res) => {
    try {
    const [updated] = await Appointment.update(req.body, {
    where: { AppointmentID: req.params.id }
    });
    if (updated) {
    const updatedAppointment = await Appointment.findByPk(req.params.id);
    res.status(200).json(updatedAppointment);
    } else {
    res.status(404).json({ error: 'Appointment not found' });
    }
} catch (error) {
    res.status(400).json({ error: error.message });
}
};

// Delete an appointment by ID
exports.deleteAppointment = async (req, res) => {
    try {
    const deleted = await Appointment.destroy({
    where: { AppointmentID: req.params.id }
    });
    if (deleted) {
    res.status(204).send();
    } else {
    res.status(404).json({ error: 'Appointment not found' });
    }
    } catch (error) {
    res.status(500).json({ error: error.message });
}
};
