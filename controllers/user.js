const User = require('../models/User');

exports.addUser = async (req, res, next) => {
    try{
    console.log("Inside Create user")
    const name =  req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    let user = await User.create({ name: name, email: email, password: password})
    res.status(200).json({user:user,sucess:true});
    }
    catch(err){
      res.status(403).json(err.errors[0]);
    }
  };