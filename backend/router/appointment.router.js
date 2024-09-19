const express = require('express');
const router = express.Router();

// Get all appointments
router.get('/', appointmentController.getAllAppointments);
// Get appointments by doctor ID
  router.get('/doctor/:id', (req, res) => {
    res.send(`Get appointments by doctor ID: ${req.params.id}`);
  });
  
// Get appointments by patient ID
  router.get('/patient/:id', (req, res) => {
    res.send(`Get appointments by patient ID: ${req.params.id}`);
  });

// Get appointments by date
  router.get('/date/:date', (req, res) => {
    res.send(`Get appointments by date: ${req.params.date}`);
  });
  
// Get appointments by time
  router.get('/time/:time', (req, res) => {
    res.send(`Get appointments by time: ${req.params.time}`);
  });
  
// Get appointments by status
  router.get('/status/:status', (req, res) => {
    res.send(`Get appointments by status: ${req.params.status}`);
  });
  
// Get appointments by doctor ID and date
  router.get('/doctor/:id/date/:date', (req, res) => {
    res.send(`Get appointments by doctor ID: ${req.params.id} and date: ${req.params.date}`);
  });
  
// Get appointments by doctor ID and time
  router.get('/doctor/:id/time/:time', (req, res) => {
    res.send(`Get appointments by doctor ID: ${req.params.id} and time: ${req.params.time}`);
  });
  
// Get appointments by doctor ID and status
  router.get('/doctor/:id/status/:status', (req, res) => {
    res.send(`Get appointments by doctor ID: ${req.params.id} and status: ${req.params.status}`);
  });
  
// Get appointments by patient ID and date
  router.get('/patient/:id/date/:date', (req, res) => {
    res.send(`Get appointments by patient ID: ${req.params.id} and date: ${req.params.date}`);
  });
  
// Get appointments by patient ID and time
  router.get('/patient/:id/time/:time', (req, res) => {
    res.send(`Get appointments by patient ID: ${req.params.id} and time: ${req.params.time}`);
  });
  
// Get appointments by patient ID and status

router.get('/patient/:id/status/:status', (req, res) => {
    res.send(`Get appointments by patient ID: ${req.params.id} and status: ${req.params.status}`);
  });
  // Get appointments by date and time
  router.get('/date/:date/time/:time', (req, res) => {
    res.send(`Get appointments by date: ${req.params.date} and time: ${req.params.time}`);
  });
  
// Get appointments by date and status
  router.get('/date/:date/status/:status', (req, res) => {
    res.send(`Get appointments by date: ${req.params.date} and status: ${req.params.status}`);
  });
  
// Get appointments by time and status
  router.get('/time/:time/status/:status', (req, res) => {
    res.send(`Get appointments by time: ${req.params.time} and status: ${req.params.status}`);
  });

// Create a new appointment
  router.post('/', (req, res) => {
    res.send('Create a new appointment');
  });

// Get a specific appointment by ID
  router.get('/:id', (req, res) => {
    res.send(`Get appointment with ID: ${req.params.id}`);
  });

  // Update an appointment by ID
  router.put('/:id', (req, res) => {
    res.send(`Update appointment with ID: ${req.params.id}`);
  });   
// Delete an appointment by ID
  router.delete('/:id', (req, res) => {
    res.send(`Delete appointment with ID: ${req.params.id}`);
  });





module.exports = router;