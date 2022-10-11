const express = require('express');
const router = express.Router();
const path = require('path');
const shopController = require('../controllers/shop.js');
const contactController = require('../controllers/contact.js');

router.get('/',shopController.getShopPage);

router.get('/contact-us',contactController.getContactPage);

router.post('/success',contactController.getSuccessPage)

module.exports = router;