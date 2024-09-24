const express = require('express');
const router = express.Router();
const mediaController = require('../controller/media.controller');
const { authenticate } = require('../middleware/auth.middlware');

// Apply authentication middleware to all routes
router.use(authenticate);

// Upload media
router.post('/upload', mediaController.uploadMedia);

module.exports = router;