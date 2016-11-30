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
                    let title = 'Tasks Page';
                    let pendingTable = module.exports.buildTable(tasks, 0, 'tasks-pending', 'Date Added', 'update', 'glyphicon-ok', 'Mark Completed')
                    let completedTable = module.exports.buildTable(tasks, 1, 'tasks-completed', 'Date Completed', 'reactivate', 'glyphicon-repeat', 'Return To Pending')
                    // Note: users and categories are used for Add Task form dropdown generation
                    return res.render('tasks', {title, pendingTable, completedTable, users, categories})
                })
            })
        })
    },

    buildTable: function(array, completedStatus, tableId, dateColTitle, updateRoute, glyphTitle, tooltipTitle) {
        let html = `
            <table class="table table-striped table-hover" id="${tableId}">
                <thead>
                    <tr class="text-blue">
                        <th> Action </th>
                        <th> User </th>
                        <th> Task </th>
                        <th> Notes </th>
                        <th> Category </th>
                        <th> ${dateColTitle} </th>
                    </tr>
                </thead>
                <tbody>`;
        array.forEach(item => {
            if(item.completed == completedStatus) {
            html += `
                <tr>
                    <td>
                        <a href="/tasks/${updateRoute}/${item.id}" data-id="${item.id}"><i class="glyphicon ${glyphTitle} text-success" name="reactivate" data-toggle="tooltip" data-placement="bottom" title="${tooltipTitle}"></i></a> &nbsp;
                        <a href="/tasks/edit/${item.id}" data-id="${item.id}"><i class="glyphicon glyphicon-pencil text-muted" name="edit" data-toggle="tooltip" data-placement="bottom" title="Edit Task"></i></a> &nbsp;
                        <a href="/tasks/delete/${item.id}" data-id="${item.id}"><i class="glyphicon glyphicon-remove text-danger" name="delete" data-toggle="tooltip" data-placement="bottom" title="Delete Task"></i></a>
                    </td>
                    <td> ${item.User.userName} </td>
                    <td> ${item.title} </td>
                    <td> ${item.notes} </td>
                    <td> ${item.Category.title} </td>
                    <td> ${item.updatedAt} </td>
                </tr>`;
            }
        })
        html += `
                </tbody>
            </table>`;
        return html;
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