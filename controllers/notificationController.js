const Notification = require('../models/Notification');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get user notifications
// @route   GET /api/notifications
// @access  Private
exports.getNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await Notification.find({ recipient: req.user.id })
    .sort({ createdAt: -1 })
    .populate('sender', 'name');
  res.status(200).json({ success: true, count: notifications.length, data: notifications });
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id
// @access  Private
exports.markAsRead = asyncHandler(async (req, res, next) => {
  let notification = await Notification.findById(req.params.id);

  if (!notification) {
    return res.status(404).json({ success: false, message: `Notification not found with id of ${req.params.id}` });
  }

  if (notification.recipient.toString() !== req.user.id) {
    return res.status(401).json({ success: false, message: 'Not authorized to update this notification' });
  }

  notification.isRead = true;
  notification.readAt = Date.now();
  await notification.save();

  res.status(200).json({ success: true, data: notification });
});
