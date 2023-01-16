const path = require('path');

const express = require('express');

const groupController = require('../controller/group');
const usergroupcontroller = require('../controller/usergroup');

const UserAuthentication = require('../middleware/auth');

const router = express.Router();

router.get('/getgroups',UserAuthentication.authUser,groupController.getGroups);
router.post('/createGroup', UserAuthentication.authUser, groupController.createGroup);
router.get('/fetchusers/:groupId',UserAuthentication.authUser, usergroupcontroller.fetchUsers);
router.post('/addUser',UserAuthentication.authUser, usergroupcontroller.addUser);
router.post('/makeAdmin', UserAuthentication.authUser, usergroupcontroller.makeAdmin);
router.get('/isAdmin/:groupId', UserAuthentication.authUser, usergroupcontroller.isAdmin);
router.post('/removeAdmin', UserAuthentication.authUser, usergroupcontroller.removeAdmin);
router.post('/removeUser',UserAuthentication.authUser, usergroupcontroller.removeUser);

module.exports = router;