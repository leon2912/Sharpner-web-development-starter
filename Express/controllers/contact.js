const path = require('path');

exports.getSuccessPage = (req,res,next)=>{
    console.log('inside secess route');
    res.sendFile(path.join(__dirname,'../','views','success.html'));   
}

exports.getContactPage = (req,res,next)=>{
    console.log('inside contact rote');
    res.sendFile(path.join(__dirname,'../','views','contact.html'));   
}