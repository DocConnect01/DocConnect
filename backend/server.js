// server.js
require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");

const cors = require("cors");
const userRoutes = require("./router/auth.router");

const userRoutesLocation = require('./router/user.router')


const testRoutes = require('./router/user.route')
const doctorRoute = require('./router/doctor.router')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(bodyParser.json());
app.use(cors());
// app.use(authenticate);
// Use routes
app.use("/api/users", userRoutes);
app.use("/api/users2", userRoutesLocation);
app.use("/api/patient", testRoutes);
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
