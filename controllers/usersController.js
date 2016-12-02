"use strict";

const models = require('../models'),
      moment = require('moment'),
      services = require('../services/services'),
      passwordMod = require('machinepack-passwords'),
      validEmail = /(^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$)|(^N\/A$)/,
      validPass = /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,}$/;

/**
 * Format the date from the db
 *
 * @param {doc[]} arr - Array of user data from db
 */
function formatDate(arr) {
    arr.forEach(item => {
        item.dataValues.createdAt = moment(item.dataValues.createdAt).format('MM/DD/YYYY');
    });
    return arr;
}

/**
 * Get user data from db and render page
 *
 * @param {string[]} errorArr - String of possible errors
 * @return {object} res - Server response
 */
function renderUsers(req, res, errorArr) {
    services.getUsers().then(users => {
        console.log('users: ' , users);
        users = formatDate(users);
        res.render('users', {title: 'System Users', users: users, errors: errorArr});
    })
}

module.exports = {
    getUsers: (req, res) => {
        return renderUsers(req, res);
    },

    addUser: (req, res) => {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let userName = req.body.userName;
        let email = req.body.email;
        let password = req.body.password;

        // Note: validation is on front end; these should never execute
        let errorArr = [];

        if(firstName == '') {
            errorArr.push('You entered an invalid First Name. \n');
        }
        if(lastName == '') {
            errorArr.push('You entered an invalid Last Name. \n');
        }
        if(userName == '') {
            errorArr.push('You entered an invalid Username. \n');
        }
        if(!validEmail.test(email)) {
            errorArr.push('You entered an invalid Email Address.');
        }
        if(!validPass.test(password)) {
            errorArr.push('Your password did not meet the minimum requirements.');
        }

        // Encrypt password
        passwordMod.encryptPassword({password}).exec({
            error: (err) => {
                errorArr.push("There was a password encryption error!");
            },
            success: function(encryptedPassword) {
                // First, check for errors to ensure that invalid data is not inserted into db
                if(errorArr.length > 0) {
                    return renderUsers(req, res, errorArr);
                }
                services.createUser(firstName, lastName, userName, email, encryptedPassword).then(data => {
                    return res.send('success');
                });
            }
        });
    },

    updateUser: (req, res) => {

    },

    deleteUser: (req, res) => {
        let id = req.body.id;
        services.deleteUser(id).then(data => {
            return res.send('success');
        });
    },
}