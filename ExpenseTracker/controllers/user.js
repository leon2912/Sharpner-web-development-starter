const User = require('../models/User');

exports.addUser = async (req, res, next) => {
    try {
        console.log("Inside Create user")
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        let user = await User.create({ name: name, email: email, password: password })
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
            if (user[0].password === password) {
                res.status(200).json({ user: user, sucess: true });
                
            }
            else {
                res.status(403).json({ message: 'Invalid Password', sucess: false });
            }
        }
    }
    catch (err) {
        console.log(err)
        res.status(403).json(err);
    }
};