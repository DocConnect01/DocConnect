// server.js
require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");

const cors = require('cors');
const authRoutes = require('./router/auth.router')
const userRoutes = require('./router/user.route')
// const cors = require("cors");
// const userRoutes = require("./router/auth.router");
const appointmentRoutes = require('./router/appointment.router');
const userRoutesLocation = require('./router/user.router')


const testRoutes = require('./router/user.route')
const doctorRoute = require('./router/doctor.router')
const availabilityRoutes = require('./router/availability.router');
// const doctorRoute = require('./router/doctor.router')
const doctor2Routes = require('./router/doctor2.router')
const chatRoutes=require("./router/chatRoom.route")
const mediaRoutes = require('./router/media.router');
// const testRoutes = require('./router/user.route')
// const doctorRoute = require('./router/doctor.router')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '100mb' }));

// app.use(authenticate);
// Use routes




app.use('/api/media', mediaRoutes);
app.use('/api', availabilityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users2", userRoutesLocation);
app.use("/api/patient", testRoutes);
app.use("/api/doctor", doctorRoute);
app.use("/api/doctor2" , doctor2Routes)

app.use("/api/users", authRoutes);
// app.use("/api/patient", userRoutes);


// app.use("/api/patient", testRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/chats', chatRoutes);

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
