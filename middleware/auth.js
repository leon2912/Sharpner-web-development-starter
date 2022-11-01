const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token,'secretKey');
        const userId = user.userId;
        let loggedUser = await User.findByPk(userId);
        req.user = loggedUser;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(403);
    }
};