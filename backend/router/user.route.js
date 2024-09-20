const express = require("express");
const router = express.Router();
const { getUsers, updateStatus } = require("../controller/user.controller");

router.get("/getUsers", getUsers);
router.post("/updateStatus", updateStatus);


module.exports = router;
