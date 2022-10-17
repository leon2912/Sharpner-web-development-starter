const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const product = new Product(title, imageUrl, description, price);
  // product.save()
  console.log(imageUrl);
  // Product.create({
    req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(()=>{res.redirect('/');})
  .catch((err)=>{
    console.log(err);
  });
};

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts()
    .then((products) => {
      res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
      });
    })
    .catch((err) => { console.log(err) });
};

module.exports.delProduct = (req,res,next) => {
  let prodId = req.body.productId;
  Product.findByPk(prodId)
  .then((product)=>{
    return product.destroy().then(()=>{res.redirect('/');});
})
.catch(err=>{console.log(err)});
}
;
