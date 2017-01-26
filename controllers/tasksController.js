'use strict';

const Sequelize = require('sequelize'),
      models = require('../models'),
      services = require('../services/services'),
      moment = require('moment');

// look at ecma6 Sets & Maps, Rest & Spread operators, for....of loops, Object extensions

/**
 * Format dates for table display using moment module
 *
 * @param {doc[]} array - Array of tasks from db
 * @return {doc[]} array - Array of reformatted tasks data
 */
function formatDate(array) {
    array.forEach(item => {
        item.dataValues.createdAt = moment(item.dataValues.createdAt).format('MM/DD/YYYY');
        item.dataValues.updatedAt = moment(item.dataValues.updatedAt).format('MM/DD/YYYY');
    });
    return array;
}

/**
 * Build the tasks table html
 *
 * @param {doc[]} array - Array of tasks
 * @param {boolean} completedStatus - Completed/incompleted status of task, determines which tasks get populated
 * @param {string} tableId - Unique identifier in <table>
 * @param {string} dateColTitle - Table column title for task date
 * @param {string} updateRoute - Express route
 * @param {string} glyphClass - Glyphicon class for table display
 * @param {string} updateName - Name attribute for <i>
 * @param {string} tooltipTitle - Display message for tooltip
 * @return {string} html - Table html
 */
function buildTable (array, completedStatus, tableId, dateColTitle, updateRoute, glyphClass, updateName, tooltipTitle) {
    let html = `
        <table class="table table-striped table-hover task" id="${tableId}">
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
                let tableAnchors = getTableAnchors({
                    updateRoute,
                    id:item.id,
                    glyphClass,
                    updateName,
                    tooltipTitle,
                });
                html += `
                <tr>
                    <td> ${tableAnchors} </td>
                    <td> ${item.User.userName} </td>
                    <td> ${item.title} </td>
                    <td> ${item.notes} </td>
                    <td> ${item.Category.title} </td>
                    <td> ${item.updatedAt} </td>
                </tr>`;
            }
        });
        html += `
                </tbody>
            </table>`;
    return html;
}

/**
 * Build the table action <td> first anchor for the task update action link instructions.
 * When table row is moved to another table, the anchor needs updating for the correct action to take place w/out page refresh
 *
 * @param {string} updateRoute - The express route
 * @param {number} id - The database id identifier
 * @param {string} glyphClass - Glyphicon to display
 * @param {string} updateName - HTML name attribute for switch statement
 * @param {string} tooltipTitle - Tooltip information to display
 * @return {string} html - The table <a> html
 */
function getTableAnchors(obj) {
    let html = `
        <a href="/tasks/${obj.updateRoute}/${obj.id}" data-id="${obj.id}"><i class="glyphicon ${obj.glyphClass} text-success"  name="${obj.updateName}" data-toggle="tooltip" data-placement="bottom" title="${obj.tooltipTitle}"></i></a> &nbsp;
        <a href="/tasks/edit/${obj.id}" data-id="${obj.id}"><i class="glyphicon glyphicon-pencil  text-muted"name="edit" data-toggle="tooltip" data-placement="bottom" title="Edit Task"></i></a> &nbsp;
        <a href="/tasks/delete/${obj.id}" data-id="${obj.id}"><i class="glyphicon glyphicon-remove  text-danger"name="delete" data-toggle="tooltip" data-placement="bottom" title="Delete Task"></i></a>`;
    console.log('table html: ' + html);
    return html;
}

module.exports = {
    getTasks: (req, res, id) => {
        Promise.all([
            services.getTasks(),
            services.getUsers(),
            services.getCategories(),
        ]).then(arr => {
            let [tasks, users, categories] = arr;
            tasks = formatDate(tasks);
            let title = 'Tasks Page';
            let pendingTable = buildTable(tasks, 0, 'tasks-pending', 'Date Added', 'update', 'glyphicon-ok', 'completed', 'Mark Completed');
            let completedTable = buildTable(tasks, 1, 'tasks-completed', 'Date Completed', 'reactivate', 'glyphicon-repeat', 'reactivate', 'Return To Pending');
            // Note: users and categories are used for Add Task form dropdown generation
            return res.render('tasks', {title, pendingTable, completedTable, users, categories});
        });
    },

    addTask: (req, res) => {
        let title = req.body.title;
        let notes = req.body.notes;
        let completed = 0;
        let CategoryId = req.body.CategoryId;
        let UserId = req.body.UserId;

        services.createTask(title, notes, completed, CategoryId, UserId).then(data => {
            res.redirect('/tasks');
        });
    },

    deleteTask: (req, res) => {
        let id = req.body.id;
        services.deleteTask(id).then(data => {
            res.send('success');
        });
    },

    // Update task completed status, and send back <td> action row
    updateTask: (req, res) => {
        let id = req.body.id;
        services.updateTask(1, id).then(data => {
            let html = getTableAnchors({
                updateRoute:'reactivate',
                id:id,
                glyphClass:'glyphicon-repeat',
                updateName:'reactivate',
                tooltipTitle:'Return To Pending',
            });
            res.send(html);
        });
    },

    // Reactivate task to pending, and send back <td> action row
    reactivateTask: (req, res) => {
        let id = req.body.id;
        services.updateTask(0, id).then(data => {
            let html = getTableAnchors({
                updateRoute:'update',
                id:id,
                glyphClass:'glyphicon-ok',
                updateName:'completed',
                tooltipTitle:'Mark Completed',
            });
            res.send(html);
        });
    },
}