const express = require('express');
const {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/')
  .get(protect, getExpenses)
  .post(protect, createExpense);

router.route('/:id')
  .put(protect, updateExpense)
  .delete(protect, deleteExpense);

module.exports = router;
