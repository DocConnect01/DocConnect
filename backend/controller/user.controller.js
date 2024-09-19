const db = require("../models");

const getUsers = async (req, res) => {
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

const updateStatus = async (req, res) => {
  const { id, status } = req.body;
  console.log(id, status);
  try {
    const updatedAppointment = await db.Appointment.update(
      { Status: status },
      {
        where: { AppointmentID: id },
      }
    );

    if (updatedAppointment[0] === 0) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error updating appointment status", error });
  }
};

module.exports = {
  getUsers,
  updateStatus,
};
