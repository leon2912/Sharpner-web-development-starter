const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('signup',userController.addUser);
// router.delete('/:expenseid',ExpenseController.deleteExpense);
// router.put('/:expenseid',ExpenseController.updateExpense);
// router.get('/:expenseid',ExpenseController.getExpense);
// router.get('/',ExpenseController.getExpenses);

module.exports = router;