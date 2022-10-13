const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/product.js');

router.get('/add-product',productController.getProduct);

router.post('/add-product',productController.addProduct);

router.post('/product',productController.product)

module.exports = router;