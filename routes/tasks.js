const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  assignTask,
  updateTaskStatus
} = require('../controllers/taskController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getTasks)
  .post(protect, authorize('admin', 'manager'), createTask);

router.route('/:id')
  .get(protect, getTask)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

router.put('/:id/assign', protect, authorize('admin', 'manager'), assignTask);
router.put('/:id/status', protect, updateTaskStatus);

module.exports = router;
