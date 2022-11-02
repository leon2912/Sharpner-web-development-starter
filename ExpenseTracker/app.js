const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database')
const expenseRoutes = require('./routes/expense');
const userRoutes = require('./routes/user');
const purchaseRoutes = require('./routes/purchase');

const Expense = require('./models/Expense');
const User = require('./models/User');
const Order = require('./models/Order');



const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/expense', expenseRoutes);
app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);


Expense.belongsTo(User);
User.hasMany(Expense);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
.sync()
// .sync({ force: true })
.then((result)=>{console.log('success')});
app.listen(3000);