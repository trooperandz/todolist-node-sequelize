const express = require('express'),
      usersController = require('../controllers/usersController'),
      tasksController = require('../controllers/tasksController'),
      users = require('./usersRouter'),
      tasks = require('./tasksRouter'),
      router = express.Router();

// Main login page
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
})

// User routes
router.get('/users', usersController.getUsers)
router.post('/users/addUser', usersController.addUser)

// Task routes
router.get('/tasks', tasksController.getTasks)
router.post('/tasks/addTask', tasksController.addTask)

/*
router.get('/users', usersRouter);

router.get('/tasks', tasksRouter);
*/

module.exports = router;
