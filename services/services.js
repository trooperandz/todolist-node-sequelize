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

    getUsers: function() {
        return models.User.findAll()
    },

    getCategories: function() {
        return models.Category.findAll()
    }
}