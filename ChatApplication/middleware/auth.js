const jwt = require('jsonwebtoken');
const User = require('../models/user');



const authUser = (req,res,next)=>{
    try{
        const token = req.header('Authorization');
        const user = jwt.verify(token, 'secretKey')
        User.findByPk(user.userId).then(user=>{  
            console.log(JSON.stringify(user));
            req.user =user;  
            next();
        }).catch(err=>console.log(err))
    }
    catch(error)
    {
        console.log(error);
    }
}



module.exports = {authUser};