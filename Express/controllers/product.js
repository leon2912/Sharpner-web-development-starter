const path = require('path');

exports.addProduct = (req,res,next)=>{
    console.log("Add product");
    res.sendFile(path.join(__dirname,'../','views','add-product.html'))
};

exports.product = (req,res,next)=>{
    console.log(req.body);
    res.redirect("/shop"); 
};