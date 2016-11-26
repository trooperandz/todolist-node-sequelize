const express = require('express'),
      usersController = require('../controllers/usersController'),
      tasksController = require('../controllers/tasksController'),
      users = require('./usersRouter'),
      tasks = require('./tasksRouter'),
      router = express.Router();

router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
})

router.get('/users', usersController.getUsers);

router.get('/tasks', tasksController.getTasks);

/*
router.get('/users', usersRouter);

router.get('/tasks', tasksRouter);
*/

module.exports = router;
