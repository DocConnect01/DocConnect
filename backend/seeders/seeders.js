'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Seed Users
      await queryInterface.bulkInsert('users', [
        {
          FirstName: 'John',
          LastName: 'Doe',
          Username: 'doctor',
          Password: 'hashedpassword1',
          Email: 'doctor@example.com',
          Role: 'Doctor',
          Speciality: 'Cardiologist',
          LocationLatitude: 40.712776,
          LocationLongitude: -74.005974,
          Bio: 'Experienced cardiologist with over 10 years of practice.',
          MeetingPrice: 100.00,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          FirstName: 'Jane',
          LastName: 'Smith',
          Username: 'patient',
          Password: 'hashedpassword2',
          Email: 'patient@example.com',
          Role: 'Patient',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more users as needed
      ]);
      console.log('users seeded successfully.');

      // Seed Appointments
      await queryInterface.bulkInsert('Appointments', [
        {
          PatientID: 2, // Adjust according to the actual patient ID
          DoctorID: 1,  // Adjust according to the actual doctor ID
          AppointmentDate: new Date('2024-10-01 10:00:00'),
          DurationMinutes: 60,
          Status: true,  // Appointment is available
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more appointments as needed
      ]);
      console.log('Appointments seeded successfully.');

      // Seed DoctorReviews
      await queryInterface.bulkInsert('DoctorReviews', [
        {
          DoctorID: 1, // Adjust according to the actual doctor ID
          PatientID: 2, // Adjust according to the actual patient ID
          Rating: 5,
          ReviewText: 'Excellent doctor, highly recommended!',
          ReviewDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more reviews as needed
      ]);
      console.log('DoctorReviews seeded successfully.');

      // Seed Chatrooms
      await queryInterface.bulkInsert('chatrooms', [
        {
          PatientID: 2, // Adjust according to the actual patient ID
          DoctorID: 1,  // Adjust according to the actual doctor ID
          StartTime: new Date(),
          EndTime: new Date(new Date().getTime() + 60 * 60 * 1000), // 1 hour chat duration
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more chatrooms as needed
      ]);
      console.log('chatrooms seeded successfully.');

      // Seed ChatroomMessages
      await queryInterface.bulkInsert('ChatroomMessages', [
        {
          ChatroomID: 1, // Adjust according to the actual chatroom ID
          SenderID: 2,  // Adjust according to the actual sender ID (Patient)
          MessageText: 'Hello Doctor, I have some questions.',
          SentAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          ChatroomID: 1, // Adjust according to the actual chatroom ID
          SenderID: 1,  // Adjust according to the actual sender ID (Doctor)
          MessageText: 'Sure, feel free to ask.',
          SentAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more messages as needed
      ]);
      console.log('ChatroomMessages seeded successfully.');
      
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Delete all seeded data
      await queryInterface.bulkDelete('ChatroomMessages', null, {});
      console.log('ChatroomMessages deleted successfully.');

      await queryInterface.bulkDelete('Chatrooms', null, {});
      console.log('Chatrooms deleted successfully.');

      await queryInterface.bulkDelete('DoctorReviews', null, {});
      console.log('DoctorReviews deleted successfully.');

      await queryInterface.bulkDelete('Appointments', null, {});
      console.log('Appointments deleted successfully.');

      await queryInterface.bulkDelete('users', null, {});
      console.log('Users deleted successfully.');

    } catch (error) {
      console.error('Error reverting seed data:', error);
    }
  }
};
