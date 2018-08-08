'use strict';

const express = require('express');
const router = express.Router();

const {
  getTasks,
  addTask,
  updateTask,
  reactivateTask,
  deleteTask,
} = require('../controllers/tasksController');

router.get('/', getTasks);
router.post('/addTask', addTask);
router.post('/update', updateTask);
router.post('/reactivate', reactivateTask);
router.post('/delete', deleteTask);

module.exports = router;