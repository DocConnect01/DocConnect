const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DoctorProfile = sequelize.define('DoctorProfile', {
    specialization: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qualifications: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experience: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contactInfo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    availability: {
      type: DataTypes.JSON,
      allowNull: false
    },
    location: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });

  return DoctorProfile;
};
