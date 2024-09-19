const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { authenticate } = require("../middleware/auth.middlware");

router.put('/update-location', authenticate, userController.updateUserLocation);
router.get('/get-location', authenticate, userController.getUserLocation);
router.get('/get-place-name', authenticate, userController.getPlaceName);
router.get('/get', userController.getAllUsers);
module.exports = router;