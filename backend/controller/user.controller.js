const db = require('../models');

// Update user's location
exports.updateUserLocation = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;
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