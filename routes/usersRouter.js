'use strict';

const express = require('express'),
      router = express.Router(),
      usersController = require('../controllers/usersController');

router.get('/', usersController.getUsers);
router.post('/login', usersController.loginUser);
router.post('/logout', usersController.logoutUser);
router.post('/create', usersController.addUser);
router.post('/update', usersController.updateUser);
router.post('/delete', usersController.deleteUser);

module.exports = router;