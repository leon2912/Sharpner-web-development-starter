const Expense = require('../models/Expense');
const User = require('../models/User');
const AWS = require('aws-sdk');
const { CognitoIdentityServiceProvider } = require('aws-sdk');

exports.getExpenses = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const Items_Per_Page = 2;
    let user = req.user;
    const page = req.query.page;
    let count = await Expense.count({where:{userId:req.user.id}});
    console.log(`ofset:${(page-1)*Items_Per_Page},limit:${Items_Per_Page}`)
    let expenses = await user.getExpenses({offset: (page-1)*Items_Per_Page, limit: Items_Per_Page})
    res.json({ expenses: expenses, user: user ,success: true,
      currPage: page,
      hasNext: count > page * Items_Per_Page,
      hasPrev: page > 1,});
  }
  catch (err) {
    console.log(err);
  }
};


exports.addExpense = (req, res, next) => {
  let user = req.user;
  const amount = req.body.amount;
  const desc = req.body.desc;
  const category = req.body.category;
  console.log(user.totalExpense);
  user.createExpense({
    amount: amount,
    desc: desc,
    category: category,
  })
    .then(
      async (result) => {
        user.totalExpense = user.totalExpense + parseFloat(amount);
        await user.save();
        res.json({expense:result,user:user});
      })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpense = async (req, res, next) => {
  try {
    let user = req.user;
    const expenseId = req.params.expenseid;
    let expense = await user.getExpenses({ where: { id: expenseId } });
    let deletedAmount = expense[0].amount;
    expense[0].destroy();
    let newTotal = parseFloat(user.totalExpense) - parseFloat(deletedAmount);
    console.log('Total Expense is',newTotal);
    req.user.update({totalExpense: newTotal});
    res.json({expenseId,user:user})
  }
  catch (err) {
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
  const amount = req.body.amount;
  const desc = req.body.desc;
  const category = req.body.category;
  user.getExpenses({ where: { id: expenseId } })
    .then((expenses) => {
      let expense = expenses[0];
      expense.amount = amount;
      expense.desc = desc;
      expense.category = category;
      return expense.save();
    })
    .then((result) => { res.json(result); })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUserExpenses = async (req, res, next) => {
  try {
    let userId = req.query.userId;
    let user = await User.findByPk(userId);
    console.log(user);
    let expenses = await user.getExpenses()
    res.json({ expenses: expenses, user: user });
  }
  catch (err) {
    console.log(err);
  }
};

exports.downloadExpenses = async (req, res, next) => {
  console.log('Inside Downloads');
  let user = req.user;
  if(user.ispremiumuser){
  try {
    let expenses = await user.getExpenses();
    let data = JSON.stringify(expenses);
    const fileName = `expense${user.id}/${new Date()}.txt`;
    const AWS_KEY_ID = process.env.AWS_KEY_ID;
    const AWS_KEY_SECRET = process.env.AWS_KEY_SECRET;
    let params = {
      Bucket: 'expensetracker2912',
      Key: fileName,
      Body: data,
      ACL: 'public-read'
    }
    let s3bucket = new AWS.S3({
      accessKeyId: AWS_KEY_ID,
      secretAccessKey: AWS_KEY_SECRET
    })

    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log(s3response, 'success');
        user.createFile({
          url: s3response.Location,
        })
          .then(() => {
            res.status(200).json({ msg: 'Saved to aws sucessfully', fileUrl: s3response.Location })
          })
          .catch((err) => {
            console.log(err);
          })
      }
    });
  }
  catch (err) {
    console.log(err);
  }
}
else{
  res.status(403).json({ msg: 'Not a premium User', success:false})
}
} 

exports.getPreviousFiles = async (req, res, next) => {
  console.log('Inside Downloads');
  try{
  let user = req.user;
  let files = await user.getFiles()
    res.json({files:files,success:true})
  }
  catch(err){
    console.log(err);
    res.json({msg:'Failed to Fetch Files',success:false})
  }
};
