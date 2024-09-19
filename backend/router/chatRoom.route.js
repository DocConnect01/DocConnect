const express = require('express');
const router = express.Router();
const chatRoomController = require('../controller/chatRoom.controller');
const {authenticate} = require('../middleware/auth.middlware.js'); // Assuming you have an auth middleware

// Apply authentication middleware to all routes
router.use(authenticate);

// Create a new chat room
router.post('/chatroom/:username', chatRoomController.createChatRoom);