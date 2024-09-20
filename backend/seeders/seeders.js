"use strict";

const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const roles = ["Doctor", "Patient", "Admin"];
      const statuses = ["pending", "confirmed", "rejected"];

      const users = [];
      const appointments = [];
      const doctorReviews = [];
      const chatrooms = [];
      const chatroomMessages = [];
      const availabilitySlots = [];

      const doctorIDs = [];

      for (let i = 1; i <= 10; i++) {
        const role = faker.helpers.arrayElement(roles);
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email(firstName, lastName);
        const username = faker.internet.userName(firstName, lastName);
        const password = faker.internet.password();
        const createdAt = new Date();
        const updatedAt = new Date();

        const user = {
          FirstName: firstName,
          LastName: lastName,
          Username: username,
          Password: password,
          Email: email,
          Role: role,
          createdAt,
          updatedAt,
        };

        if (role === "Doctor") {
          user.Speciality = faker.helpers.arrayElement([
            "Cardiologist",
            "Dermatologist",
            "Pediatrician",
          ]);
          user.LocationLatitude = faker.location.latitude();
          user.LocationLongitude = faker.location.longitude();
          user.Bio = faker.lorem.sentences(2);
          user.MeetingPrice = faker.finance.amount(50, 300, 2);

          doctorIDs.push(i);
        }

        users.push(user);
      }

      await queryInterface.bulkInsert("users", users);

      if (doctorIDs.length === 0) {
        throw new Error("No doctors generated");
      }

      for (let i = 1; i <= 10; i++) {
        const user = users[i - 1];
        if (user.Role === "Patient") {
          const doctorID = faker.helpers.arrayElement(doctorIDs);
          const appointment = {
            PatientID: i,
            DoctorID: doctorID,
            AppointmentDate: faker.date.future(),
            DurationMinutes: faker.number.int({ min: 30, max: 90 }),
            Status: faker.helpers.arrayElement(statuses),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          appointments.push(appointment);

          const review = {
            DoctorID: doctorID,
            PatientID: i,
            Rating: faker.number.int({ min: 1, max: 5 }),
            ReviewText: faker.lorem.sentences(2),
            ReviewDate: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          doctorReviews.push(review);

          const chatroom = {
            PatientID: i,
            DoctorID: doctorID,
            StartTime: new Date(),
            EndTime: faker.date.soon(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          chatrooms.push(chatroom);

          const chatMessages = [
            {
              ChatroomID: chatroom.id || 1,
              SenderID: i,
              MessageText: "Hello Doctor, I have some questions.",
              SentAt: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
            {
              ChatroomID: chatroom.id || 1,
              SenderID: doctorID,
              MessageText: "Sure, feel free to ask.",
              SentAt: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ];
          chatroomMessages.push(...chatMessages);
        }
      }

      for (let doctorID of doctorIDs) {
        for (let j = 0; j < 5; j++) {
          const availableDate = faker.date.soon(30);
          const startTime = faker.date.recent("HH:mm");
          const endTime = faker.date.soon(1, "HH:mm");
          const isAvailable = faker.datatype.boolean();

          const availabilitySlot = {
            DoctorID: doctorID,
            AvailableDate: availableDate,
            StartTime: startTime,
            EndTime: endTime,
            IsAvailable: isAvailable,
          };
          availabilitySlots.push(availabilitySlot);
        }
      }

      await queryInterface.bulkInsert("Appointments", appointments);
      await queryInterface.bulkInsert("DoctorReviews", doctorReviews);
      await queryInterface.bulkInsert("chatrooms", chatrooms);
      await queryInterface.bulkInsert("ChatroomMessages", chatroomMessages);
      await queryInterface.bulkInsert("availability", availabilitySlots);

      console.log("Data seeded successfully.");
    } catch (error) {
      console.error("Error seeding data:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete("ChatroomMessages", null, {});
      await queryInterface.bulkDelete("chatrooms", null, {});
      await queryInterface.bulkDelete("DoctorReviews", null, {});
      await queryInterface.bulkDelete("Appointments", null, {});
      await queryInterface.bulkDelete("availability", null, {});
      await queryInterface.bulkDelete("users", null, {});

      console.log("Seeded data reverted successfully.");
    } catch (error) {
      console.error("Error reverting seed data:", error);
    }
  },
};
