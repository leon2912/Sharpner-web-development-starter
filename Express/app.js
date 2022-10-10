const express = require('express');
const app = express();
app.use((req,res,next)=>{
    console.log("I am in middle ware 1");
    next();
})

app.use((req,res,next)=>{
    console.log("I am in middle ware 2");
    res.send('<h1>Welcome to my Express App</h1>');
})

app.listen(4000);