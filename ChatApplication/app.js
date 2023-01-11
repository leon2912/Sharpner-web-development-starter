const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/user');
const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const Chat = require('./models/chat');
const messageRoutes = require('./routes/message');



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/message', messageRoutes);




User.hasMany(Chat);
Chat.belongsTo(User);



sequelize
.sync()
// .sync({ force: true })
.then((result)=>{console.log('success')
app.listen(3000);}
);