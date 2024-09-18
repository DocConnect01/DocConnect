const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Update user's location
router.put('/update-location', userController.updateUserLocation);

// Get place name from coordinates
router.get('/get-place-name', userController.getPlaceName);

module.exports = router;