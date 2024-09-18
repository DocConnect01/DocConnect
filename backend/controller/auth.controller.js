const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
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

  // Check if role is either Doctor or Patient
  if (Role !== "Doctor" && Role !== "Patient") {
    return res
      .status(400)
      .json({ message: "Invalid role. Only Doctor or Patient can register." });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Create the user
    const newUser = await db.User.create({
      FirstName,
      LastName,
      Username,
      Password: hashedPassword,
      Email,
      Role,
      Speciality: Role === "Doctor" ? Speciality : null,
      Bio: Role === "Doctor" ? Bio : null,
      MeetingPrice: Role === "Doctor" ? MeetingPrice : null,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Login for Admin, Doctor, and Patient
exports.login = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await db.User.findOne({ where: { Email: Email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { UserID: user.UserID, Role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
    console.log(error);
  }
};
