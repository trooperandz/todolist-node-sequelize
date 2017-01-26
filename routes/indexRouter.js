'use strict';

const express = require('express'),
      indexController = require('../controllers/indexController'),
      router = express.Router();

router.get('/', indexController.renderIndexPage);

module.exports = router;