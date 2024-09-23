'use strict';

const path = require('path');
const fs = require('fs');
const {Sequelize, DataTypes} = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

require('dotenv').config(); 

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  logging: false
});

// Import models
db.User = require('./user.models')(sequelize);
db.DoctorReview = require('./doctorReview.models')(sequelize);
db.Chatrooms = require('./chatRoom.models')(sequelize);
db.Appointment = require('./appointments.models')(sequelize);
db.ChatroomMessage = require('./chatroomMessage.models')(sequelize);
db.Availability = require('./availability.models.js')(sequelize, DataTypes);


// 1. One-to-Many relationship between User (Patient) and Appointment
db.User.hasMany(db.Appointment, {
  foreignKey: 'PatientID',
  as: 'PatientAppointments'
});
db.Appointment.belongsTo(db.User, {
  foreignKey: 'PatientID',
  as: 'Patient'
});

// 2. One-to-Many relationship between User (Doctor) and Appointment
db.User.hasMany(db.Appointment, {
  foreignKey: 'DoctorID',
  as: 'DoctorAppointments'
});
db.Appointment.belongsTo(db.User, {
  foreignKey: 'DoctorID',
  as: 'Doctor'
});

// 3. One-to-Many relationship between User (Patient) and DoctorReview
db.User.hasMany(db.DoctorReview, {
  foreignKey: 'PatientID',
  as: 'PatientReviews'
});
db.DoctorReview.belongsTo(db.User, {
  foreignKey: 'PatientID',
  as: 'Patient'
});

// 4. One-to-Many relationship between User (Doctor) and DoctorReview
db.User.hasMany(db.DoctorReview, {
  foreignKey: 'DoctorID',
  as: 'DoctorReviews'
});
db.DoctorReview.belongsTo(db.User, {
  foreignKey: 'DoctorID',
  as: 'Doctor'
});

// 5. One-to-Many relationship between User (Patient) and Chatroom
db.User.hasMany(db.Chatrooms, {
  foreignKey: 'PatientID',
  as: 'PatientChatrooms'
});
db.Chatrooms.belongsTo(db.User, {
  foreignKey: 'PatientID',
  as: 'Patient'
});

// 6. One-to-Many relationship between User (Doctor) and Chatroom
db.User.hasMany(db.Chatrooms, {
  foreignKey: 'DoctorID',
  as: 'DoctorChatrooms'
});
db.Chatrooms.belongsTo(db.User, {
  foreignKey: 'DoctorID',
  as: 'Doctor'
});

// 7. One-to-Many relationship between Chatroom and ChatroomMessage
db.Chatrooms.hasMany(db.ChatroomMessage, {
  foreignKey: 'ChatroomID',
  as: 'Messages'
});
db.ChatroomMessage.belongsTo(db.Chatrooms, {
  foreignKey: 'ChatroomID',
  as: 'Chatroom'
});

// 8. One-to-Many relationship between User (Sender) and ChatroomMessage
db.User.hasMany(db.ChatroomMessage, {
  foreignKey: 'SenderID',
  as: 'SentMessages'
});
db.ChatroomMessage.belongsTo(db.User, {
  foreignKey: 'SenderID',
  as: 'Sender'
});




// Define associations between models

// User and Appointment associations
db.User.hasMany(db.Appointment, { foreignKey: 'DoctorID' });
db.User.hasMany(db.Appointment, { foreignKey: 'PatientID' });


// User and ChatroomMessage associations
db.User.hasMany(db.ChatroomMessage, { foreignKey: 'SenderID' });
db.ChatroomMessage.belongsTo(db.User, { foreignKey: 'SenderID' });

// User and DoctorReview associations
db.User.hasMany(db.DoctorReview, { foreignKey: 'DoctorID' });
db.DoctorReview.belongsTo(db.User, { foreignKey: 'DoctorID' });

db.User.hasMany(db.DoctorReview, { foreignKey: 'PatientID' });
db.DoctorReview.belongsTo(db.User, { foreignKey: 'PatientID' });

// User and Availability associations
db.User.hasMany(db.Availability, { foreignKey: 'DoctorID' });
db.Availability.belongsTo(db.User, { foreignKey: 'DoctorID' });


try {
   sequelize.authenticate();
   console.log("===========================================")
  console.log('Connection has been established successfully.');
  console.log("===========================================")
} catch (error) {User
  console.error('Unable to connect to the database:', error);
}
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
