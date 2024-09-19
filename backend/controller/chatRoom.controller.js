const { User, Chatrooms, ChatroomMessage } = require('../models');
const { Op } = require('sequelize');

exports.createChatRoom = async (req, res) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({ message: 'Participant username is required' });
    }

    console.log('Current user:', req.user);

    const participant = await User.findOne({ where: { Username: username } });
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    
    console.log('Participant:', participant);

    let DoctorID, PatientID;
    if (req.user.Role === 'Doctor') {
      DoctorID = req.user.UserID;
      PatientID = participant.UserID;
    } else {
      DoctorID = participant.UserID;
      PatientID = req.user.UserID;
    }

    console.log('DoctorID:', DoctorID, 'PatientID:', PatientID);

    if (!DoctorID || !PatientID) {
      return res.status(400).json({ message: 'Invalid doctor or patient ID' });
    }

    const existingChatRoom = await Chatrooms.findOne({
      where: {
        [Op.and]: [
          { DoctorID },
          { PatientID }
        ]
      }
    });

    if (existingChatRoom) {
      return res.status(409).json({
        message: 'Chat room already exists',
        chatRoom: existingChatRoom,
      });
    }

    const newChatRoom = await Chatrooms.create({
      DoctorID,
      PatientID,
    });

    res.status(201).json({
      message: 'Chat room created successfully',
      chatRoom: newChatRoom,
    });
  } catch (error) {
    console.error('Error creating chat room:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};