const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Appointment = sequelize.define('Appointment', {
    AppointmentID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    PatientID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'UserID'
      }
    },
    DoctorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'UserID'
      }
    },
    AppointmentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    StartTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    DurationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'rejected'),
      allowNull: false,
      defaultValue: 'pending' // Optional: set a default valu,e
    },
    
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  return Appointment;
};




