// const { product } = require('../../Express/controllers/product');
// const db = require('../util/database');

// module.exports = class Product {
//   constructor(title, imageUrl, description, price) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     // const insertQuery = `INSERT INTO products ('title', 'price', 'description', 'imageUrl') VALUES ('${this.title}', '${this.price}', '${this.description}', '${this.imageUrl}');`
//     return db.execute('INSERT INTO products ( title, price, description, imageUrl ) VALUES (?,?,?,?)',
//     [this.title, this.price, this.description, this.imageUrl]
//     );
//   }

//   static fetchAll() {
//     return db.execute('select * from products');
//   }

//   static findById(prodId) {
//     return db.execute('select * from products where id = ?',[prodId]);
//   }

//   static delete(prodId){
//     return db.execute('delete from products where id = ?',[prodId]);
// }
// };

const Sequelize = require('sequelize');
const { product } = require('../../Express/controllers/product');
const sequelize = require('../util/database')

const Product = sequelize.define('product',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Product;