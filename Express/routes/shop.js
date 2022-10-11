const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','shop.html'));   
})

router.get('/contact-us',(req,res,next)=>{
    console.log('inside contact rote');
    res.sendFile(path.join(__dirname,'../','views','contact.html'));   
})

router.post('/success',(req,res,next)=>{
    console.log('inside secess route');
    res.sendFile(path.join(__dirname,'../','views','success.html'));   
})

module.exports = router;