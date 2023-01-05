const User = require('../models/User');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

//Creating new user via signup
exports.addUser = async (req, res, next) => {
    try {
        console.log("Inside Create user")
        console.log(req.body);
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        console.log(password);
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        let user = await User.create({ name: name, email: email,phone:phone, password: hashedPassword })
        res.status(200).json({ user: user, sucess: true });
    }
    catch (err) {
        console.log(err);
        res.status(403).json(err);
    }
};