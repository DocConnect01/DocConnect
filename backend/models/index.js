'use strict';

const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

require('dotenv').config(); // Load environment variables

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false
});

// Import models
db.User = require('./user.models')(sequelize);
db.DoctorProfile = require('./doctorProfile.models')(sequelize);
db.Chat = require('./chat.models')(sequelize);
db.Appointment = require('./appointments.models')(sequelize);


// Define associations
 // 1. One-to-Many relationship between User (Patient) and Appointment
 User.hasMany(Appointment, {
  foreignKey: 'PatientID',
  as: 'PatientAppointments'
});
Appointment.belongsTo(User, {
  foreignKey: 'PatientID',
  as: 'Patient'
});

// 2. One-to-Many relationship between User (Doctor) and Appointment
User.hasMany(Appointment, {
  foreignKey: 'DoctorID',
  as: 'DoctorAppointments'
});
Appointment.belongsTo(User, {
  foreignKey: 'DoctorID',
  as: 'Doctor'
});

// 3. One-to-Many relationship between User (Patient) and DoctorReview
User.hasMany(DoctorReview, {
  foreignKey: 'PatientID',
  as: 'PatientReviews'
});
DoctorReview.belongsTo(User, {
  foreignKey: 'PatientID',
  as: 'Patient'
});

// 4. One-to-Many relationship between User (Doctor) and DoctorReview
User.hasMany(DoctorReview, {
  foreignKey: 'DoctorID',
  as: 'DoctorReviews'
});
DoctorReview.belongsTo(User, {
  foreignKey: 'DoctorID',
  as: 'Doctor'
});

// 5. One-to-Many relationship between User (Patient) and Chatroom
User.hasMany(Chatroom, {
  foreignKey: 'PatientID',
  as: 'PatientChatrooms'
});
Chatroom.belongsTo(User, {
  foreignKey: 'PatientID',
  as: 'Patient'
});

// 6. One-to-Many relationship between User (Doctor) and Chatroom
User.hasMany(Chatroom, {
  foreignKey: 'DoctorID',
  as: 'DoctorChatrooms'
});
Chatroom.belongsTo(User, {
  foreignKey: 'DoctorID',
  as: 'Doctor'
});

// 7. One-to-Many relationship between Chatroom and ChatroomMessage
Chatroom.hasMany(ChatroomMessage, {
  foreignKey: 'ChatroomID',
  as: 'Messages'
});
ChatroomMessage.belongsTo(Chatroom, {
  foreignKey: 'ChatroomID',
  as: 'Chatroom'
});

// 8. One-to-Many relationship between User (Sender) and ChatroomMessage
User.hasMany(ChatroomMessage, {
  foreignKey: 'SenderID',
  as: 'SentMessages'
});

// sequelize.sync({ alter: true }) // alter to adjust existing tables if needed
//   .then(() => {
//     console.log('Database synced');
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });



db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
