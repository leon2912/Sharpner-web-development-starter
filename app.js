const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database')
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
const Expense = require('./models/Expense');
const User = require('./models/User');


const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/expense', expenseRoutes);
app.use('/user', userRoutes);


Expense.belongsTo(User);
User.hasMany(Expense);
sequelize
.sync()
// .sync({ force: true })
.then((result)=>{console.log('success')});
app.listen(3000);