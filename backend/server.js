// server.js
require("dotenv").config();
const express = require("express");
const { sequelize } = require("./models");
const bodyParser = require("body-parser");

<<<<<<< HEAD
const cors = require("cors");
const userRoutes = require("./router/auth.router");
const doctorRoute = require("./router/doctor.router");
const { authenticate } = require("./middleware/auth.middlware");
const userRoutesLocation = require('./router/user.router')
=======
const cors = require('cors');
const userRoutes = require('./router/auth.router')
const testRoutes = require('./router/user.route')
const doctorRoute = require('./router/doctor.router')
>>>>>>> ebe9c30a477c476151f4758a0955d9d291f3beea
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(bodyParser.json());
app.use(cors());
// app.use(authenticate);
// Use routes

app.use("/api/users", userRoutes);
<<<<<<< HEAD
app.use("/api/users2", userRoutesLocation);
=======
app.use("/api/patient", testRoutes);
>>>>>>> ebe9c30a477c476151f4758a0955d9d291f3beea
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
