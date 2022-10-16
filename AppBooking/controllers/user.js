const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    User.findAll()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => { console.log(err) });
  };

  exports.addUser = (req, res, next) => {
    console.log(`This id req Body ${req.body} END`);
    const name =  req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    console.log(name,phone,email);
    User.create({
      name: name,
      phone: phone,
      email: email,
    })
    .then((result)=>{res.json(result);})
    .catch((err)=>{
      console.log(err);
    });
  };

  exports.deleteUsers = (req, res, next) => {
    const userId = req.params.userid;
    console.log(userId);
    User.findByPk(userId)
      .then((user) => {
        user.destroy();
        res.send(userId);
      })
      .catch((err) => { console.log(err) });
  };

  exports.getUser = (req, res, next) => {
    const userId = req.params.userid;
    User.findByPk(userId)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => { console.log(err) });
  };