'use strict';

const express = require('express');
const router = express.Router();

const {
  getUsers,
  loginUser,
  logoutUser,
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

router.get('/', getUsers);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/create', addUser);
router.post('/update', updateUser);
router.post('/delete', deleteUser);

module.exports = router;