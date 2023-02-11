const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Creating new user via signup
exports.addUser = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        let user = await User.create({ name: name, email: email,phone:phone, password: hashedPassword })
        res.status(200).json({ user: user, sucess: true });
    }
    catch (err) {
        console.log(err);
        res.status(403).json(err.errors[0]);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        let user = await User.findAll({ where: { email: email } });
        if (user.length == 0) {
            res.status(404).json({ message: 'User Not Found', sucess: false });
        }
        else {
            let passCorrect = await bcrypt.compare(password,user[0].password);
            if (passCorrect) {
                console.log(user[0].id);
                let token = jwt.sign(({userId:user[0].id}),'secretKey');
                res.status(200).json({ user: user, sucess: true , token:token });
            }
            else {
                res.status(401).json({ message: 'Invalid Password', sucess: false });
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(403).json(err);
    }
};