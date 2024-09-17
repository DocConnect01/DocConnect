const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Chatrooms = sequelize.define('chatrooms', {
    ChatroomID: {
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
    StartTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  return Chatrooms;
};
