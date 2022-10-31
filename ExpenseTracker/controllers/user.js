const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.addUser = async (req, res, next) => {
    try {
        console.log("Inside Create user")
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        let user = await User.create({ name: name, email: email, password: hashedPassword })
        res.status(200).json({ user: user, sucess: true });
    }
    catch (err) {
        res.status(403).json(err.errors[0]);
    }
};

exports.checkUser = async (req, res, next) => {
    try {
        console.log("Inside login user")
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        let user = await User.findAll({ where: { email: email } });
        if (user.length == 0) {
            res.status(404).json({ message: 'User Not Found', sucess: false });
        }
        else {
            let passCorrect = await bcrypt.compare(password,user[0].password);
            console.log(passCorrect);
            if (passCorrect) {
                res.status(200).json({ user: user, sucess: true });

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