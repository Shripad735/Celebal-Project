const Category = require('../models/Category');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({ createdBy: req.user.id });
  res.status(200).json({ success: true, count: categories.length, data: categories });
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user.id;
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, data: category });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ success: false, message: `Category not found with id of ${req.params.id}` });
  }

  if (category.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, message: 'Not authorized to update this category' });
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: category });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ success: false, message: `Category not found with id of ${req.params.id}` });
  }

  if (category.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(401).json({ success: false, message: 'Not authorized to delete this category' });
  }

  await category.deleteOne();

  res.status(200).json({ success: true, data: {} });
});
