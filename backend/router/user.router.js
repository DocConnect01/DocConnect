const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { authenticate } = require("../middleware/auth.middlware");

router.put('/update-location', authenticate, userController.updateUserLocation);
router.get('/get-location', authenticate, userController.getUserLocation);
router.get('/get-place-name', authenticate, userController.getPlaceName);
router.get('/get', userController.getAllUsers);
router.get('/get-user-by-id', authenticate, userController.getUserById);
router.get('/profile', authenticate, userController.getUserProfile); 
router.put('/profile', authenticate, userController.updateUserProfile); 

module.exports = router;