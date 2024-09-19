const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');


router.put('/update-location', userController.updateUserLocation);


router.get('/get-place-name', userController.getPlaceName);

module.exports = router;