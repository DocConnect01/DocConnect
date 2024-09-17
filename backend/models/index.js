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

// Many-to-Many relationship between Users (Patients and Doctors)
db.User.belongsToMany(db.User, { as: 'Doctors', through: 'UserConnections', foreignKey: 'patientId' });
db.User.belongsToMany(db.User, { as: 'Patients', through: 'UserConnections', foreignKey: 'doctorId' });

// One-to-One relationship between Users and DoctorProfiles
db.User.hasOne(db.DoctorProfile, { foreignKey: 'userId' });
db.DoctorProfile.belongsTo(db.User, { foreignKey: 'userId' });

// One-to-Many relationship between Users (Doctors & Patients) and Appointments
db.User.hasMany(db.Appointment, { foreignKey: 'doctorId', as: 'DoctorAppointments' });
db.User.hasMany(db.Appointment, { foreignKey: 'patientId', as: 'PatientAppointments' });
db.Appointment.belongsTo(db.User, { foreignKey: 'doctorId', as: 'Doctor' });
db.Appointment.belongsTo(db.User, { foreignKey: 'patientId', as: 'Patient' });

// One-to-Many relationship between Users (Doctors & Patients) and Chat
db.User.hasMany(db.Chat, { foreignKey: 'doctorId', as: 'DoctorChats' });
db.User.hasMany(db.Chat, { foreignKey: 'patientId', as: 'PatientChats' });
db.Chat.belongsTo(db.User, { foreignKey: 'doctorId', as: 'Doctor' });
db.Chat.belongsTo(db.User, { foreignKey: 'patientId', as: 'Patient' });

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
