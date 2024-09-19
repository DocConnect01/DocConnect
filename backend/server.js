// server.js
require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");

const cors = require("cors");
const userRoutes = require("./router/auth.router");
const doctorRoute = require("./router/doctor.router");
const { authenticate } = require("./middleware/auth.middlware");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(bodyParser.json());
app.use(cors());
// app.use(authenticate);
// Use routes

app.use("/api/users", userRoutes);
// app.use('/api/appointments', appointmentRoutes);
// app.use('/api/chats', chatRoutes);

// Test route

// Sync Sequelize models and start server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
