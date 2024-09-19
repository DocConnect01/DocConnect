const jwt = require("jsonwebtoken");

// Middleware to verify JWT and role
<<<<<<< HEAD
// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   console.log("Token:", token);
//   if (!token) {
//     return res
//       .status(401)
//       .json({ message: "Authentication failed. Token missing." });
//   }
=======
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log("Token:", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Token missing." });
  }
>>>>>>> 87c1facb1e78e1697739273441e4d267d5ee3f15

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// Middleware to allow only Admin
const isAdmin = (req, res, next) => {
  if (req.user.Role !== "Admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Middleware to allow only Doctors
const isDoctor = (req, res, next) => {
  if (req.user.Role !== "Doctor") {
    return res.status(403).json({ message: "Access denied. Doctors only." });
  }
  next();
};

// Middleware to allow only Patients
const isPatient = (req, res, next) => {
  if (req.user.Role !== "Patient") {
    return res.status(403).json({ message: "Access denied. Patients only." });
  }
  next();
};

module.exports = {  isAdmin, isDoctor, isPatient };
