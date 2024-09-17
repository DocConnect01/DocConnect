'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Seed Users
      await queryInterface.bulkInsert('Users', [
        {
          username: 'patient1',
          password: 'hashedpassword1',
          email: 'patient1@example.com',
          role: 'Patient',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'doctor1',
          password: 'hashedpassword2',
          email: 'doctor1@example.com',
          role: 'Doctor',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more users as needed
      ]);
      console.log('Users seeded successfully.');

      // Seed DoctorProfiles
      await queryInterface.bulkInsert('DoctorProfiles', [
        {
          userId: 2, // Adjust according to the actual user ID
          specialization: 'Cardiologist',
          qualifications: 'MBBS, MD',
          experience: 10,
          contactInfo: '123-456-7890',
          availability: JSON.stringify({ Monday: '9am-5pm', Tuesday: '9am-5pm' }),
          location: JSON.stringify({ city: 'New York', zipCode: '10001' }),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more profiles as needed
      ]);
      console.log('DoctorProfiles seeded successfully.');

      // Seed Appointments
      await queryInterface.bulkInsert('Appointments', [
        {
          doctorId: 2, // Adjust according to the actual doctor ID
          patientId: 1, // Adjust according to the actual patient ID
          date: new Date('2024-10-01'),
          time: '10:00:00',
          status: 'Pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more appointments as needed
      ]);
      console.log('Appointments seeded successfully.');

      // Seed Chats
      await queryInterface.bulkInsert('Chats', [
        {
          doctorId: 2, // Adjust according to the actual doctor ID
          patientId: 1, // Adjust according to the actual patient ID
          message: 'Hello, I need to reschedule my appointment.',
          timestamp: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more chat messages as needed
      ]);
      console.log('Chats seeded successfully.');
      
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Delete all seeded data
      await queryInterface.bulkDelete('Chats', null, {});
      console.log('Chats deleted successfully.');

      await queryInterface.bulkDelete('Appointments', null, {});
      console.log('Appointments deleted successfully.');

      await queryInterface.bulkDelete('DoctorProfiles', null, {});
      console.log('DoctorProfiles deleted successfully.');

      await queryInterface.bulkDelete('Users', null, {});
      console.log('Users deleted successfully.');

    } catch (error) {
      console.error('Error reverting seed data:', error);
    }
  }
};
