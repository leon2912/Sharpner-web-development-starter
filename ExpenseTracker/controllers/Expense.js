const Expense = require('../models/Expense');
const User = require('../models/User');

exports.getExpenses = async (req, res, next) => {
  try{
  console.log(req.user.id);  
  let user = req.user;
  let expenses = await user.getExpenses()
  res.json({expenses:expenses,user:user});
  }
  catch(err){
    console.log(err);
  }
  };

  exports.addExpense = (req, res, next) => {
    let user = req.user;
    const amount =  req.body.amount;
    const desc = req.body.desc;
    const category = req.body.category;
    user.createExpense({
        amount: amount,
        desc: desc,
        category: category,
      })
    .then((result)=>{res.json(result);})
    .catch((err)=>{
      console.log(err);
    });
  };

  exports.deleteExpense = async (req, res, next) => {
    try{
    let user = req.user;
    const expenseId = req.params.expenseid;
    let expense = await user.getExpenses({where:{id:expenseId}});
    expense[0].destroy();
    res.send(expenseId)
    }
    catch(err){
      console.log(err);
    }

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
    let user = req.user;
    const expenseId = req.params.expenseid;
    const amount =  req.body.amount;
    const desc = req.body.desc;
    const category = req.body.category;
    user.getExpenses({where:{id:expenseId}})
    .then((expenses)=>{
      let expense = expenses[0];
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

