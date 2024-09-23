const db = require('../models');
// Create Availability
const createAvailability = async (req, res) => {
  const { DoctorID, AvailableDate, StartTime, EndTime } = req.body;

  try {
    const newAvailability = await db.Availability.create({
      DoctorID,
      AvailableDate,
      StartTime,
      EndTime,
    });

    res.status(201).json(newAvailability);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create availability' });
  }
};

// Get All Availability for a Doctor
const getDoctorAvailability = async (req, res) => {
  const { DoctorID } = req.params;

  try {
    const availability = await db.Availability.findAll({ where: { DoctorID } });
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve availability' });
  }
};

// Delete Availability
const deleteAvailability = async (req, res) => {
  const { AvailabilityID } = req.params;

  try {
    await db.Availability.destroy({ where: { AvailabilityID } });
    res.status(200).json({ message: 'Availability deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete availability' });
  }
};

module.exports = {
  createAvailability,
  getDoctorAvailability,
  deleteAvailability,
};
