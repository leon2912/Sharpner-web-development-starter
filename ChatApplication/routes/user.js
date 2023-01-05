const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
// const UserAuthentication = require('../middleware/auth');

router.post('/signup',userController.addUser);
router.post('/login',userController.loginUser);
// router.get('/',UserAuthentication.authUser, userController.getUsers);
// router.delete('/:expenseid',ExpenseController.deleteExpense);
// router.put('/:expenseid',ExpenseController.updateExpense);
// router.get('/:expenseid',ExpenseController.getExpense);
// router.get('/',ExpenseController.getExpenses);

module.exports = router;