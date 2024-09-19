const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const { Op } = require("sequelize");
require("dotenv").config();

// Register Doctor or Patient
exports.register = async (req, res) => {
  const {
    FirstName,
    LastName,
    Username,
    Password,
    Email,
    Role,
    Speciality,
    Bio,
    MeetingPrice,
  } = req.body;

  if (Role !== "Doctor" && Role !== "Patient") {
    return res.status(400).json({ message: "Invalid role. Only Doctor or Patient can register." });
  }

  try {
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = await db.User.create({
      FirstName,
      LastName,
      Username,
      Password: hashedPassword,
      Email,
      Role,
      ...(Role === "Doctor" && { Speciality, Bio, MeetingPrice }),
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login for Admin, Doctor, and Patient
exports.login = async (req, res) => {
  const { Email, Username, Password } = req.body;

  if ((!Email && !Username) || !Password) {
    return res.status(400).json({ message: "Email or Username, and Password are required" });
  }

  try {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [
          { Email: Email || '' },
          { Username: Username || '' }
        ],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { UserID: user.UserID, Role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};