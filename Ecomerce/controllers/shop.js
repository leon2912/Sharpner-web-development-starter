const { product } = require('../../Express/controllers/product');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((result) => {
      res.render('shop/product-list', {
        prods: result[0],
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch((err) => { console.log(err) });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([row, fileData]) => {
      console.log(row);
      res.render('shop/product-detail', {
        product: row[0],
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fileData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch((err) => { console.log(err) });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.postCart = (req, res, next) => {
  // res.render('shop/cart', {
  //   path: '/cart',
  //   pageTitle: 'Your Cart'
  // });
  const prodId = req.body.productId;
  console.log(prodId);
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
