const Expense = require('../models/Expense');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Private
exports.getExpenses = asyncHandler(async (req, res, next) => {
  let query;
  if (req.user.role === 'admin') {
    query = Expense.find();
  } else {
    query = Expense.find({ createdBy: req.user.id });
  }
  const expenses = await query.populate('createdBy', 'name email');
  res.status(200).json({ success: true, count: expenses.length, data: expenses });
});

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Private
exports.createExpense = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const expense = await Expense.create(req.body);
  res.status(201).json({ success: true, data: expense });
});

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
exports.updateExpense = asyncHandler(async (req, res, next) => {
  let expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({ success: false, message: `Expense not found with id of ${req.params.id}` });
  }

  if (expense.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, message: 'Not authorized to update this expense' });
  }

  expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: expense });
});

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
exports.deleteExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return res.status(404).json({ success: false, message: `Expense not found with id of ${req.params.id}` });
  }

  if (expense.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, message: 'Not authorized to delete this expense' });
  }

  await expense.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
