const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database')
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase');
require('dotenv').config();
const Expense = require('./models/Expense');
const User = require('./models/User');
const Order = require('./models/Order');
const resetPasswordRoutes = require('./routes/resetpassword')
const Forgotpassword = require('./models/forgotpassword');
const DownloadedFiles = require('./models/downloadedFiles');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const { url } = require('inspector');


const app = express();
app.use(helmet());
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('tiny', { stream: accessLogStream }))
app.use(cors());
app.use(bodyParser.json());
app.use('/expense', expenseRoutes);
app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/password', resetPasswordRoutes);



Expense.belongsTo(User);
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

DownloadedFiles.belongsTo(User);
User.hasMany(DownloadedFiles);

sequelize
.sync()
// .sync({ force: true })
.then((result)=>{console.log('success')
app.listen(3000);}
);
