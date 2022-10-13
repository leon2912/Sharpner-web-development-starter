const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);


module.exports = class Cart {
    static addProduct(id,productPrice){
        fs.readFile(p,(err,data)=>{
            //Get the Cart either Empty or having previous added products
            let cart = { products : [], totalPrice : 0}
            if(!err){
                cart = JSON.parse(data);
            }
            //Add product to cart 2 cases: either product is already Existing or Product to be added newly
            const existingProductIndex = cart.products.findIndex((prod) => {return prod.id === id });
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
                }
            else{
                updatedProduct = { id : id, qty : 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),(err)=>{
                console.log(err);
            })
        })
    }
}