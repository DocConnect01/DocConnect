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
exports.getAllChatRooms = async (req, res) => {
    try {
      const userId = req.user.UserID;
      const userRole = req.user.Role;
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      let chatRooms;
  
      if (userRole === 'Doctor') {
        chatRooms = await Chatrooms.findAll({
          where: { DoctorID: userId },
          include: [
            { model: User, as: 'Patient', attributes: ['UserID', 'FirstName', 'LastName', 'Email'] }
          ],
          order: [['createdAt', 'DESC']]
        });
      } else if (userRole === 'Patient') {
        chatRooms = await Chatrooms.findAll({
          where: { PatientID: userId },
          include: [
            { model: User, as: 'Doctor', attributes: ['UserID', 'FirstName', 'LastName', 'Email'] }
          ],
          order: [['createdAt', 'DESC']]
        });
      } else {
        return res.status(403).json({ message: 'Invalid user role' });
      }
  
      res.status(200).json(chatRooms);
    } catch (error) {
      console.error('Error fetching user chat rooms:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };