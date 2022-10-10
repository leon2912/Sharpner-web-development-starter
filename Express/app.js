const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended : false}));

app.use('/add-product',(req,res,next)=>{
    console.log("Add product");
    res.send('<form action="/product" method="POST"><input type="text" name="title"> <input type="text" name="quantity" > <button type="submit">SUBMIT</Button></form>')
})

app.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect("/"); 
})

app.use('/',(req,res,next)=>{
    console.log("Home Directory");
    res.send('<h1>This is Home Page</h1>')   
})

app.listen(4000);