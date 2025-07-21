const express = require('express');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .get(protect, getCategories)
  .post(protect, authorize('admin', 'manager'), createCategory);

router.route('/:id')
  .put(protect, authorize('admin', 'manager'), updateCategory)
  .delete(protect, authorize('admin', 'manager'), deleteCategory);

module.exports = router;
