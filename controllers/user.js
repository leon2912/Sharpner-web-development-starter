const User = require('../models/User');

exports.addUser = async (req, res, next) => {
    try{
    const name =  req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let user = await Expense.create({ name: name, email: email, password: password})
    res.json({user:user,sucess:true});
    }
    catch(err){
      console.log(err);
    }
  };