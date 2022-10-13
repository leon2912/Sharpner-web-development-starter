const path = require('path');
const Product = require('../models/product');

exports.getProduct = (req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','add-product.html'))
};

exports.addProduct = (req,res,next)=>{
    const product = new Product(req.body.title);
    product.save();
    res.send('<h1>Product Added Successfully</h1>');
};

exports.product = (req,res,next)=>{
    console.log(req.body);
    res.redirect("/shop"); 
};