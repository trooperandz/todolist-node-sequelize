"use strict";

const Sequelize = require('sequelize'),
      models = require('../models');

module.exports = {
    getTasks: function() {
        return models.Task.findAll({
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
        })
    },

    updateTask: function(status, id) {
        return models.Task.update({
            completed: status,
        },  {
            where:{ id }
        })
    },

    getUsers: function() {
        return models.User.findAll()
    },

    getCategories: function() {
        return models.Category.findAll()
    }
}