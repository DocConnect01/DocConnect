const db = require('../models'); // Import the User model
const { Op } = require('sequelize');


const getAllDoctorsForHome = async (req, res) => {
  try {
    const doctors = await db.User.findAll({
      where: { Role: 'Doctor' },
      attributes: ['UserID', 'FirstName', 'LastName', 'Speciality', 'Bio', 'LocationLatitude', 'LocationLongitude', 'Email'],
    });
    return res.status(200).json(doctors);
  } catch (error) {
    console.error('Error in getAllDoctorsForHome:', error);
    return res.status(500).json({ message: 'Error retrieving doctors', error: error.toString() });
  }
};
 

  
  const searchDoctors = async (req, res) => {
    try {
      const { name, speciality, available, nearMe, perimeter, latitude, longitude , coords } = req.body;
      const userLocation = coords ;
  
      let whereClause = { Role: 'Doctor' };
  
      if (name) whereClause.FirstName = { [Op.like]: `%${name}%` };
      if (speciality) whereClause.Speciality = { [Op.like]: `%${speciality}%` };
      if (available) whereClause.Available = true;
  
      const doctors = await db.User.findAll({
        where: whereClause,
        attributes: ['UserID', 'FirstName', 'LastName', 'Speciality', 'Bio', 'LocationLatitude', 'LocationLongitude'],
      });
  
      let filteredDoctors = doctors;
  
      const searchLatitude = latitude || userLocation.LocationLatitude;
      const searchLongitude = longitude || userLocation.LocationLongitude;
  
      if (searchLatitude && searchLongitude && (nearMe || perimeter !== null)) {
        const searchPerimeter = nearMe ? 20 : perimeter;
        filteredDoctors = doctors.filter(doctor => {
          if (doctor.LocationLatitude && doctor.LocationLongitude) {
            const distance = calculateDistance(searchLatitude, searchLongitude, doctor.LocationLatitude, doctor.LocationLongitude);
            return searchPerimeter === null || distance <= searchPerimeter;
          }
          return false;
        });
      }
  
      return res.status(200).json(filteredDoctors);
    } catch (error) {
      console.error('Error in searchDoctors:', error);
      return res.status(500).json({ message: 'Error searching doctors', error: error.toString() });
    }
  };
  
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }
  
  module.exports = {
    getAllDoctorsForHome,
    searchDoctors,
  };
  
  // ... rest of the file remains unchanged


  // Create a new Doctor profile
// const createDoctorProfile = async (req, res) => {
//     try {
//         const { FirstName, LastName, Username, Password, Email, Speciality, LocationLatitude, LocationLongitude, Bio, MeetingPrice } = req.body;
        
//         const doctor = await db.User.create({
//             FirstName,
//             LastName,
//             Username,
//             Password, // Make sure to hash the password before saving
//             Email,
//             Role: 'Doctor', // Doctor role only
//             Speciality,
//             LocationLatitude,
//             LocationLongitude,
//             Bio,
//             MeetingPrice
//         });
        
//         return res.status(201).json(doctor);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error creating doctor profile', error });
//     }
// };

// // Get all Doctor profiles
// const getDoctors = async (req, res) => {
//     try {
//         const doctors = await db.User.findAll({ where: { Role: 'Doctor' } });
//         return res.status(200).json(doctors);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error retrieving doctors', error });
//     }
// };

// // Get a single Doctor profile by ID
// const getDoctorById = async (req, res) => {
//     try {
//         const doctor = await db.User.findOne({ where: { UserID: req.params.id, Role: 'Doctor' } });
//         if (!doctor) {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }
//         return res.status(200).json(doctor);
//     } catch (error) {
//         return res.status(500).json({ message: 'Error retrieving doctor', error });
//     }
// };

// // Update a Doctor profile
// const updateDoctorProfile = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedDoctor = await db.User.update(req.body, { where: { UserID: id, Role: 'Doctor' } });
        
//         if (!updatedDoctor) {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }
        
//         return res.status(200).json({ message: 'Doctor profile updated successfully' });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error updating doctor profile', error });
//     }
// };

// // Delete a Doctor profile
// const deleteDoctorProfile = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const doctor = await db.User.destroy({ where: { UserID: id, Role: 'Doctor' } });
        
//         if (!doctor) {
//             return res.status(404).json({ message: 'Doctor not found' });
//         }
        
//         return res.status(200).json({ message: 'Doctor profile deleted successfully' });
//     } catch (error) {
//         return res.status(500).json({ message: 'Error deleting doctor profile', error });
//     }
// };