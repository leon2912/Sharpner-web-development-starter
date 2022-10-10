const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    console.log("Home Directory");
    res.send('<h1>This is Home Page</h1>')   
})

module.exports = router;