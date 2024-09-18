const db = require('../models'); // Import the User model

// Create a new Doctor profile
const createDoctorProfile = async (req, res) => {
    try {
        const { FirstName, LastName, Username, Password, Email, Speciality, LocationLatitude, LocationLongitude, Bio, MeetingPrice } = req.body;
        
        const doctor = await db.User.create({
            FirstName,
            LastName,
            Username,
            Password, // Make sure to hash the password before saving
            Email,
            Role: 'Doctor', // Doctor role only
            Speciality,
            LocationLatitude,
            LocationLongitude,
            Bio,
            MeetingPrice
        });
        
        return res.status(201).json(doctor);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating doctor profile', error });
    }
};

// Get all Doctor profiles
const getDoctors = async (req, res) => {
    try {
        const doctors = await db.User.findAll({ where: { Role: 'Doctor' } });
        return res.status(200).json(doctors);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving doctors', error });
    }
};

// Get a single Doctor profile by ID
const getDoctorById = async (req, res) => {
    try {
        const doctor = await db.User.findOne({ where: { UserID: req.params.id, Role: 'Doctor' } });
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        return res.status(200).json(doctor);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving doctor', error });
    }
};

// Update a Doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedDoctor = await db.User.update(req.body, { where: { UserID: id, Role: 'Doctor' } });
        
        if (!updatedDoctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        
        return res.status(200).json({ message: 'Doctor profile updated successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error updating doctor profile', error });
    }
};

// Delete a Doctor profile
const deleteDoctorProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await db.User.destroy({ where: { UserID: id, Role: 'Doctor' } });
        
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        
        return res.status(200).json({ message: 'Doctor profile deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting doctor profile', error });
    }
};

module.exports = {
    createDoctorProfile,
    getDoctors,
    getDoctorById,
    updateDoctorProfile,
    deleteDoctorProfile
};
