const db = require('../models');
const cloudinary = require('cloudinary').v2;
const { Op } = require('sequelize');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadMedia = async (req, res) => {
  try {
    const { base64 } = req.body;
    const userId = req.user.UserID;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'user_profiles'
    });

    // Check if media already exists for the user
    const existingMedia = await db.Media.findOne({ where: { UserID: userId } });

    if (existingMedia) {
      // Update the existing media entry
      existingMedia.url = result.secure_url;
      await existingMedia.save();
      return res.status(200).json({ message: 'Media updated successfully', media: existingMedia });
    } else {
      // Create a new media entry
      const newMedia = await db.Media.create({
        UserID: userId,
        url: result.secure_url
      });
      return res.status(201).json({ message: 'Media uploaded successfully', media: newMedia });
    }
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).json({ message: 'Error uploading media', error: error.message });
  }
};