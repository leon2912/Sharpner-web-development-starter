const express = require('express');

const purchaseController = require('../controllers/purchase');

const UserAuthentication = require('../middleware/auth');


const router = express.Router();

router.get('/premiummembership', UserAuthentication.authUser,purchaseController.purchasepremium);

router.post('/updatetransactionstatus', UserAuthentication.authUser, purchaseController.updateTransactionStatus)

module.exports = router;