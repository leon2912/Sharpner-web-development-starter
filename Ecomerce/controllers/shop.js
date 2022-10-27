const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  const page = req.query.page;
  Product.count()
    .then((count) => {
      let limit = 1;
      let offset = (page - 1) * limit;
      Product.findAll({ offset: offset, limit: limit })
        .then(products => {
          // res.render('shop/product-list', {
          //   prods: products,
          //   pageTitle: 'All Products',
          //   path: '/products'
          // });
          res.json({
            products: products,
            success: true,
            currPage: page,
            hasNext: count > page * limit,
            hasPrev: page > 1,
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // Product.findAll({ where: { id: prodId } })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));
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

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          // res.render('shop/cart', {
          //   path: '/cart',
          //   pageTitle: 'Your Cart',
          //   products: products
          // });
          res.json(products);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    .then(() => {
      res.status(200).json({ success: true, message: 'Item Added Successfully' })
    })
    .catch(err => console.log(err));
  // .catch(() => { res.status(500).json({ success: false, message: 'Error Occured while adding Product to cart' }) });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.query.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.json({message: `Item removed Successfully`});
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
  .then(orders=>{
    res.json(orders);
  })
  .catch(err=>console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};


exports.postOrder = (req, res, next) => {
  // const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      // return cart.getProducts({ where: { id: prodId } });
      return cart.getProducts();
    })
    .then(products => {
      req.user.createOrder()
        .then(order => {
          products.forEach((product) => {
            order.addProduct(product, { through: { quantity: product.cartItem.quantity } })
          })
          return order.id;
        })
        .then((orderId) => {
          res.status(200).json({ success: true, message: 'ORder Placed Successfully', orderID: orderId })
        })
    })
    .catch(err => console.log(err));
};

exports.getOrderDetails = async (req, res, next) => {
  let orderId = req.query.orderId;
  console.log('inside Order Details');
  try{
  // req.user
  //   .getOrders({ where: { id: orderId } })
  //   .then(orders => {
  //         const order = orders[0];
  //         order.getProducts()
  //         .then(products=>{
  //           res.json(products);
  //         })
  //         .catch(err => console.log(err));
  //       })
  //       .catch(err => console.log(err));
  let orders = await req.user.getOrders({ where: { id: orderId } });
  const order = orders[0];
  const products = await order.getProducts();
  res.json(products);
  }
  catch{
    res.json({message:"something went wrong"});
  }
};