"use strict";

const Sequelize = require('sequelize'),
      models = require('../models'),
      moment = require('moment');

module.exports = {
    getTasks: function(req, res) {
        models.Task.findAll({
            include: [
                {
                    model: models.User,
                    required: true,
                },

                {
                    model: models.Category,
                    required: true
                }
            ]
        }).then(function(tasks) {
            tasks = module.exports.formatDate(tasks)
            models.User.findAll().then(users => {
                models.Category.findAll().then(categories => {
                    console.log('tasks: ' , tasks + 'users: ' + users + ' categories: ' + categories)
                    return res.render('tasks', {title: 'Tasks Page', tasks, users, categories})
                })
            })

            //return res.render('tasks', {title: 'Tasks Page', tasks: tasks})
        })
    },

    addTask: function(req, res) {
        let title = req.body.title;
        let notes = req.body.notes;
        let completed = 0;
        let CategoryId = req.body.CategoryId;
        let UserId = req.body.UserId;

        models.Task.create({title, notes, completed, CategoryId, UserId}).then(task => {
            res.redirect('/tasks')
        })
    },

    deleteTask: function(req, res) {
        let id = req.params.id;
        models.Task.destroy({
            where:{id}
        }).then(task => {
            res.redirect('/tasks')
        })
    },

    // Update task completed status
    updateTask: function(req, res) {
        console.log("reached updateTask fn")
        let id = req.body.id;
        models.Task.update({
            completed: 1,
        },  {
            where:{ id }
        }).then(task => {
            res.send('success')
        })
    },

    // Format dates using moment module
    formatDate: function(array) {
        array.forEach((item, index) => {
            item.dataValues.createdAt = moment(item.dataValues.createdAt).format('MM/DD/YYYY')
            item.dataValues.updatedAt = moment(item.dataValues.updatedAt).format('MM/DD/YYYY')
        })
        return array;
    },
}