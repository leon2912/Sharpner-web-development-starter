const { json } = require("body-parser");
const fs = require('fs');
const path = require('path');


const p = path.join(__dirname, '../', 'data', 'product.json')

const products = [];

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
        console.log(fileContent);
      }
    });
  };

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          });
    }

    fetchAll(cb) {
        getProductsFromFile(cb);
    }
}