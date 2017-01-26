'use strict';

const Sequelize = require('sequelize'),
      models = require('../models');

module.exports = {
    getTasks: () => {
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
        });
    },

    createTask: (title, notes, completed, CategoryId, UserId) => {
        return models.Task.create({
            title, notes, completed, CategoryId, UserId
        });
    },

    updateTask: (status, id) => {
        return models.Task.update({
            completed: status,
        },  {
            where:{ id }
        });
    },

    deleteTask: (id) => {
        return models.Task.destroy({
            where: { id }
        });
    },

    // Get one user. For login processing.
    getUser: (userName) => {
        return models.User.findOne({
            where: { userName }
        });
    },

    // Get all users
    getUsers: () => {
        return models.User.findAll();
    },

    createUser: (firstName, lastName, userName, email, password) => {
        return models.User.create({
            firstName, lastName, userName, email, password
        });
    },

    deleteUser: (id) => {
        return models.User.destroy({
            where: { id }
        });
    },

    getCategories: () => {
        return models.Category.findAll();
    }
}