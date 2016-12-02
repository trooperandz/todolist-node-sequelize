const express = require('express'),
      usersController = require('../controllers/usersController'),
      tasksController = require('../controllers/tasksController'),
      users = require('./usersRouter'),
      tasks = require('./tasksRouter'),
      router = express.Router();
// Note: cmd + D (hold until all similar chars are selected)....then use navigation arrows, then type what you need
// Main login page
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

// User routes
router.get('/users', usersController.getUsers);
router.post('/users/create', usersController.addUser);
router.post('/users/update', usersController.updateUser);
router.post('/users/delete', usersController.deleteUser);

// Task routes
/* If you need to pass another parameter:
router.get('/tasks', (req, res) => {
    tasksController.getTasks(req, res, 'id-lakjsdflasjflaskjdflk');
});*/
router.get('/tasks', tasksController.getTasks);
router.post('/tasks/addTask', tasksController.addTask);
router.post('/tasks/update', tasksController.updateTask);
router.post('/tasks/reactivate', tasksController.reactivateTask);
router.post('/tasks/delete', tasksController.deleteTask);

/*
router.get('/users', usersRouter);

router.get('/tasks', tasksRouter);
*/

module.exports = router;
