const express = require('express');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/user');
const sequelize = require('./util/database');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/user', userRoutes);

sequelize
.sync()
// .sync({ force: true })
.then((result)=>{console.log('success')
app.listen(3000);}
);