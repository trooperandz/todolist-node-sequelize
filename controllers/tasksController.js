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
                    //attributes:[['title', 'task'], ['user', 'username']]
                    //where: { id: Sequelize.col('task.UserId') }
                },

                {
                    model: models.Category,
                    required: true
                }
            ],
            attributes:[['title', 'task']]//, ['User.username', 'user']]
            //attributes:[['title', 'task'], ['username', 'user']]
        }).then(function(tasks) {
            console.log('tasks: ' , tasks)
            res.render('tasks', {title: 'Tasks Page', tasks: tasks})
        })
        /*
        var tasks = [
            {
                task: "Replace car battery",
                status: 1
            },
            {
                task: "Get a blackboard",
                status: 0
            }
        ]
        res.render('tasks', {title: 'Tasks Page', tasks: tasks})
    }*/
}
}