const express = require('express');
const {
  getNotifications,
  markAsRead
} = require('../controllers/notificationController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getNotifications);

router.route('/:id')
  .put(protect, markAsRead);

module.exports = router;
