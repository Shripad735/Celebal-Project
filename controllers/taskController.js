const Task = require('../models/Task');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  // Can add filtering based on req.query
  const tasks = await Task.find({ assignedTo: req.user.id }).populate('category assignedBy', 'name email');
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate('category assignedBy assignedTo', 'name email');

  if (!task) {
    return res.status(404).json({ success: false, message: `Task not found with id of ${req.params.id}` });
  }

  res.status(200).json({ success: true, data: task });
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  req.body.assignedBy = req.user.id;
  const task = await Task.create(req.body);
  res.status(201).json({ success: true, data: task });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: `Task not found with id of ${req.params.id}` });
  }

  // Make sure user is the task owner or admin
  if (task.assignedTo.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to update this task' });
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: task });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ success: false, message: `Task not found with id of ${req.params.id}` });
  }

  // Make sure user is the task owner or admin
  if (task.assignedTo.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this task' });
  }

  await task.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
