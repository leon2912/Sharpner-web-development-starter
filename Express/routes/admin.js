const express = require('express');
const router = express.Router();

router.get('/add-product',(req,res,next)=>{
    console.log("Add product");
    res.send('<form action="/admin/product" method="POST"><label>Product<label><input type="text" name="title"><label>Quantity<lable> <input type="text" name="quantity" > <button type="submit">SUBMIT</Button></form>')
})

router.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect("/shop"); 
})

module.exports = router;