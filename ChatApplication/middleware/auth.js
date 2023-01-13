const User = require('../models/User');
const Chat = require('../models/chat');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // console.log(`Inside Auth Method Token is: ${token}`);
        const user = jwt.verify(token,'secretKey');
        const userId = user.userId;
        let loggedUser = await User.findByPk(userId);
        console.log(loggedUser);
        req.user = loggedUser;
        next();
    }
    catch (err) {
        console.log(err);
        res.status(403);
    }
};