"use strict";

const Sequelize = require('sequelize'),
      models = require('../models');

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
    }
}