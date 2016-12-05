'use strict';

const express = require('express'),
      router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Taskinator Login' });
});

module.exports = router;