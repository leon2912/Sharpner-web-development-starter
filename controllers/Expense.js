const Expense = require('../models/Expense');

exports.getExpenses = (req, res, next) => {
    Expense.findAll()
      .then((expenses) => {
        res.json(expenses);
      })
      .catch((err) => { console.log(err) });
  };

  exports.addExpense = (req, res, next) => {
    console.log(`This id req Body ${req.body} END`);
    const amount =  req.body.amount;
    const desc = req.body.desc;
    const category = req.body.category;
    // console.log(name,phone,email);
    Expense.create({
      amount: amount,
      desc: desc,
      category: category,
    })
    .then((result)=>{res.json(result);})
    .catch((err)=>{
      console.log(err);
    });
  };

  exports.deleteExpense = (req, res, next) => {
    const expenseId = req.params.expenseid;
    console.log(expenseId);
    Expense.findByPk(expenseId)
      .then((expense) => {
        expense.destroy();
        res.send(expenseId);
      })
      .catch((err) => { console.log(err) });
  };

  exports.getExpense = (req, res, next) => {
    const expenseId = req.params.expenseid;
    Expense.findByPk(expenseId)
      .then((expense) => {
        res.send(expense);
      })
      .catch((err) => { console.log(err) });
  };

  exports.updateExpense = (req, res, next) => {
    const expenseId = req.params.expenseid;
    const amount =  req.body.amount;
    const desc = req.body.desc;
    const category = req.body.category;
    Expense.findByPk(expenseId)
    .then((expense)=>{
      expense.amount = amount;
      expense.desc = desc;
      expense.category = category;
      return expense.save();
    })
    .then((result)=>{res.json(result);})
    .catch((err)=>{
      console.log(err);
    });
  };

