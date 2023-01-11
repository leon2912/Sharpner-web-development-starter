const express = require('express');
const router = express.Router();
const UserAuthentication = require('../middleware/auth');
const chatController = require('../controller/chat');

router.post('/postMessage',UserAuthentication.authUser,chatController.postMessage);

module.exports = router;