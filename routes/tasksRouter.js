var express = require('express');
var router = express.Router();

// Get tasks listings
router.get('/', function(req, res, next) {
    res.render('tasks', { title: 'Tasks Page', message: "This is the tasks page!"});
});

module.exports = router;