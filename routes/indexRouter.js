'use strict';

const express = require('express');
const { renderIndexPage } = require('../controllers/indexController');
const router = express.Router();

router.get('/', renderIndexPage);

module.exports = router;