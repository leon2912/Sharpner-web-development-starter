const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/Expense');

router.post('/',ExpenseController.addExpense);
router.delete('/:expenseid',ExpenseController.deleteExpense);
router.get('/:expenseid',ExpenseController.getExpense);
router.get('/',ExpenseController.getExpenses);

module.exports = router;