const db = require("../models");

const createDoctorProfile = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Username,
      Password,
      Email,
      Speciality,
      LocationLatitude,
      LocationLongitude,
      Bio,
      MeetingPrice,
    } = req.body;


    
    const doctor = await db.User.create({
      FirstName,
      LastName,
      Username,
      Password,
      Email,
      Role: "Doctor",
      Speciality,
      LocationLatitude,
      LocationLongitude,
      Bio,
      MeetingPrice,
    });

    return res.status(201).json(doctor);
  } catch (error) {
    console.error("Error creating doctor profile:", error); // Added logging
    return res
      .status(500)
      .json({ message: "Error creating doctor profile", error });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await db.User.findAll({
      where: { Role: "Doctor" },
      include: [{ model: db.Media, as: 'ProfilePicture', where: { UserID: db.Sequelize.col('User.UserID') }, required: false }],
    });

    const doctorsWithMedia = doctors.map(doctor => ({
      ...doctor.toJSON(),
      PhotoUrl: doctor.ProfilePicture ? doctor.ProfilePicture.url : null,
    }));

    return res.status(200).json(doctorsWithMedia);
  } catch (error) {
    console.error("Error retrieving doctors:", error);
    return res.status(500).json({ message: "Error retrieving doctors", error });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await db.User.findOne({
      where: { UserID: req.params.id, Role: "Doctor" },
    });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    return res.status(200).json(doctor);
  } catch (error) {
    console.error("Error retrieving doctor:", error); // Added logging
    return res.status(500).json({ message: "Error retrieving doctor", error });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await db.User.update(req.body, {
      where: { UserID: id, Role: "Doctor" },
    });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Doctor not found or no changes made" });
    }

    return res
      .status(200)
      .json({ message: "Doctor profile updated successfully" });
  } catch (error) {
    console.error("Error updating doctor profile:", error); // Added logging
    return res
      .status(500)
      .json({ message: "Error updating doctor profile", error });
  }
};

const deleteDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.User.destroy({
      where: { UserID: id, Role: "Doctor" },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res
      .status(200)
      .json({ message: "Doctor profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor profile:", error); // Added logging
    return res
      .status(500)
      .json({ message: "Error deleting doctor profile", error });
  }
};

exports.getCurrentDoctor = async (req, res) => {
  try {
    const doctorId = req.user.id; // Assuming you have middleware that sets req.user
    const doctor = await db.User.findOne({
      where: { UserID: doctorId, Role: "Doctor" },
      attributes: ['UserID', 'FirstName', 'LastName', 'Speciality', 'MeetingPrice', 'Bio']
    });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    return res.status(200).json(doctor);
  } catch (error) {
    console.error('Error fetching current doctor:', error);
    return res
      .status(500)
      .json({ message: "Error fetching doctor data", error: error.message });
  }
};

module.exports = {
  
  createDoctorProfile,
  getDoctors,
  getDoctorById,
  updateDoctorProfile,
  deleteDoctorProfile,
};
