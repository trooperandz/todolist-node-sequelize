'use strict';

const express = require('express'),
      router = express.Router(),
      tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getTasks);
router.post('/addTask', tasksController.addTask);
router.post('/update', tasksController.updateTask);
router.post('/reactivate', tasksController.reactivateTask);
router.post('/delete', tasksController.deleteTask);

module.exports = router;