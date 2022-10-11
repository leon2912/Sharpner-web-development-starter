const path = require('path');

exports.getShopPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','shop.html'));   
}