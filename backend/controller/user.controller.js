const db = require('../models');


exports.updateUserLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.user.UserID;
    const updatedUser = await db.User.update(
      { LocationLatitude: latitude, LocationLongitude: longitude },
      { where: { UserID: userId } }
    );
    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating location', error: error.message });
  }
};

// Get place name from coordinates
exports.getPlaceName = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
    const data = await response.json();
    res.status(200).json({ placeName: data.display_name });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching place name', error: error.message });
  }
};

// Get user's location
exports.getUserLocation = async (req, res) => {
  try {
    const userId = req.user.UserID;
    const user = await db.User.findByPk(userId, {
      attributes: ['UserID', 'LocationLatitude', 'LocationLongitude']
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ 
      message: 'User location retrieved successfully',
      location: {
        latitude: user.LocationLatitude,
        longitude: user.LocationLongitude
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user location', error: error.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};  


exports.getUserById = async (req, res) => {
  try {
    const userId = req.user.UserID;
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};


exports.getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: { role: "PATIENT" },
      include: [
        {
          model: db.Appointment,
          as: "PatientAppointments",
        },
        { model: db.DoctorReview, as: "DoctorReviews" },
        { model: db.Availability, as: "Availabilities" },
      ],
    });

    return res
      .status(200)
      .json(users.filter((i) => i?.PatientAppointments.length > 0));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting user profile", error });
  }
};

exports.updateStatus = async (req, res) => {
  const { id, status } = req.body;
  console.log('Updating appointment:', id, status);
  try {
    const appointment = await db.Appointment.findByPk(id);
    
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.Status = status;
    await appointment.save();

    console.log('Appointment updated successfully:', appointment);
    return res.status(200).json({ success: true, appointment });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return res
      .status(500)
      .json({ message: "Error updating appointment status", error: error.message });
  }
};

