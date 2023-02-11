const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const groupRoutes = require('./routes/group');

const User = require('./models/user');
const Chat = require('./models/chat');
const Group = require('./models/group');
const UserGroup = require('./models/usergroup');




const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);
app.use('/message', messageRoutes);
app.use('/group', groupRoutes );
app.use((req,res)=>{
    console.log('frontend url:',req.url);
    res.sendFile(path.join(__dirname,`public/${req.url}`));
})




User.hasMany(Chat);
Chat.belongsTo(User);
Group.hasMany(Chat);
Chat.belongsTo(Group);
User.belongsToMany(Group , {through: UserGroup} )
Group.belongsToMany(User , {through: UserGroup} )



sequelize
.sync()
// .sync({ force: true })
.then((result)=>{console.log('success')
app.listen(3000);}
);