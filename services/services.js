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

    createTask: function(title, notes, completed, CategoryId, UserId) {
        return models.Task.create({
            title, notes, completed, CategoryId, UserId
        })
    },

    updateTask: function(status, id) {
        return models.Task.update({
            completed: status,
        },  {
            where:{ id }
        })
    },

    deleteTask: function(id) {
        return models.Task.destroy({
            where: { id }
        })
    },

    getUsers: function() {
        return models.User.findAll()
    },

    getCategories: function() {
        return models.Category.findAll()
    }
}