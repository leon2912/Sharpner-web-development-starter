const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/Expense');
const UserAuthentication = require('../middleware/auth');

router.post('/', UserAuthentication.authUser,ExpenseController.addExpense);
router.delete('/:expenseid',UserAuthentication.authUser ,ExpenseController.deleteExpense);
router.put('/:expenseid',UserAuthentication.authUser, ExpenseController.updateExpense);
// router.get('/:expenseid',ExpenseController.getExpense);
router.get('/premiumUser', ExpenseController.getUserExpenses);
router.get('/download', UserAuthentication.authUser , ExpenseController.downloadExpenses);
router.get('/getFiles', UserAuthentication.authUser , ExpenseController.getPreviousFiles);
router.get('/userExpenses', UserAuthentication.authUser , ExpenseController.getExpenses);
module.exports = router;