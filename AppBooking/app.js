const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database')
const UserController = require('./controllers/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/user',UserController.addUser);
app.delete('/user/:userid',UserController.deleteUsers);
app.get('/user/:userid',UserController.getUser);
app.get('/user',UserController.getUsers);


sequelize.sync()
.then((result)=>{console.log('success')});

app.listen(3000);