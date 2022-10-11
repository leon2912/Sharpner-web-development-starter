const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended : false}));

app.use('/login',(req,res,next)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="POST"><label>User Name<label><input type="text" name="uname" id="username"> <button type="submit">SUBMIT</Button></form>')   
})

app.get('/',(req,res,next)=>{
    let text ='';
    if(fs.existsSync('message.txt')){
    text = fs.readFileSync('message.txt', { encoding: 'utf-8' });
    }
    const form = `<div>${text}</div><form onsubmit="document.getElementById('username').value = localStorage.getItem('username')" action="/" method="POST"><input type="text" name="message"> <input type="hidden" id="username" name = "uname">  <button type="submit">Send</Button></form>`;
    res.send(form);
});

app.post('/',(req,res,next)=>{
    if(req.body.message != null){
    let message = `${req.body.uname} : ${req.body.message} <br>`;
    fs.appendFileSync('message.txt',message);
    console.log(message);
    console.log(req.body);
    }
    res.redirect('/');
})


app.use((req,res,next)=>{res.send('<h1> Page Not Found</h1>')});

app.listen(3000);