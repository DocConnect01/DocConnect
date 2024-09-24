const express = require("express");
const router = express.Router();
const { register, login, session } = require("../controller/auth.controller");
const { authenticate } = require("../middleware/auth.middlware");
// Register Doctor or Patient
router.post("/register", register);

router.get('/check-doctor', authenticate, (req, res) => {
    res.json({ isDoctor: req.user.Role === 'Doctor' });
  });
  router.get('/check-patient', authenticate, (req, res) => {
    res.json({ isPatient: req.user.Role === 'Patient' });
  });   
// Login for Admin, Doctor, and Patient
router.post("/login", login);
router.get("/session", session);

module.exports = router;
