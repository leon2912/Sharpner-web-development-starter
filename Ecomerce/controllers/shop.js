const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async (req, res, next) => {
  try {
    const page = req.query.page;
    let count = await Product.count();
    let limit = 1;
    let offset = (page - 1) * limit;
    let products = await Product.findAll({ offset: offset, limit: limit })
    res.json({
      products: products,
      success: true,
      currPage: page,
      hasNext: count > page * limit,
      hasPrev: page > 1,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: 'Something Went Wrong' });
  }
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = async (req, res, next) => {
  try{
  let cart = await req.user.getCart()
  let products = await cart.getProducts()
  res.json(products);
  }
  catch(err){
    res.status(500).json({ success: false, message: 'Something Went Wrong' });
    console.log(err);
  }
  
};

exports.postCart = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    let cart = await req.user.getCart()
    fetchedCart = cart;
    let products = await cart.getProducts({ where: { id: prodId } });
    let product;
    if (products.length > 0) {
      product = products[0];
    }
    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
    }
    else {
      product = await Product.findByPk(prodId)
    };
    await fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
    res.status(200).json({ success: true, message: 'Item Added Successfully' });
  }
  catch (err) {
    res.status(500).json({ success: false, message: 'Something Went Wrong' });
    console.log(err)
  };
};

exports.postCartDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.query.productId;
    let cart = await req.user.getCart()
    let products = await cart.getProducts({ where: { id: prodId } });
    const product = products[0];
    await product.cartItem.destroy();
    res.json({ message: `Item removed Successfully` });
  }
  catch (err) {
    res.status(500).json({ success: false, message: 'Something Went Wrong' });
    console.log(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try{
  let orders = await req.user.getOrders()
    res.json(orders);
  }
  catch(err){
    res.status(500).json({ success: false, message: 'Something Went Wrong' });
    console.log(err);
  };
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.postOrder = async (req, res, next) => {
  try {
    let cart = await req.user.getCart();
    let products = await cart.getProducts();
    let order = await req.user.createOrder()
    products.forEach((product) => {
      order.addProduct(product, { through: { quantity: product.cartItem.quantity } })
    })
    res.status(200).json({ success: true, message: 'Order Placed Successfully', orderID: order.id })
  }
  catch (err) {
    res.status(500).json({ success: false, message: 'Something Went Wrong' })
    console.log(err);
  };
};

exports.getOrderDetails = async (req, res, next) => {
  try {
    let orderId = req.query.orderId;
    let orders = await req.user.getOrders({ where: { id: orderId } });
    const order = orders[0];
    const products = await order.getProducts();
    res.json(products);
  }
  catch (err) {
    res.json({ message: "something went wrong" });
    console.log(err);
  }
};