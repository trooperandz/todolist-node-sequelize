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

    // Note: this function is not performed via AJAX
    loginUser: (req, res) => {
        let userName = req.body.userName;
        let password = req.body.password;

        let errors = [];

        if (!userName) {
            errors.push('Please enter a username!');
        }

        if (!password) {
            errors.push('Please enter a password!');
        }

        if (errors.length > 0) {
            return res.render('index', { userName, password, errors });
        }

        // Find user in db. Note: data will be null if no record is found.
        services.getUser(userName).then((data) => {
            if (!data) {
                // No user found
                errors.push('You entered an incorrect username or password!');
                return res.render('index', {errors});
            } else {
                // User was found
                let user = data.dataValues;

                // Verify encrypted password
                passwordMod.checkPassword({
                    passwordAttempt: password,
                    encryptedPassword: user.password,
                }).exec({
                    // An unexpected error occurred.
                    error: function (err) {
                        errors.push('We are sorry, but an unexpected error occurred. \n Please see the administrator.');
                        return res.render('index', { userName, password, errors });
                    },
                    // Password attempt does not match already-encrypted version
                    incorrect: function () {
                        errors.push('You entered an incorrect username or password! Please try again.');
                        return res.render('index', { userName, password, errors });
                    },
                    // Password verified. Set session vars for user and proceed to main tasks page
                    success: function () {
                        req.session.authenticated = true;
                        req.session.firstName = user.firstName;
                        req.session.lastName = user.lastName;
                        req.session.userName = userName; // Already entered at login
                        req.session.userEmail = user.email;
                        // Test session vars
                        console.log(`Session vars: firstName: ${user.firstName} lastName: ${user.lastName} userName: ${user.userName} Email: ${user.email}`);

                        // Redirect to main tasks page
                        return res.redirect('/tasks');
                    },
                });
            }
        });
    },

    logoutUser: (req, res) => {

    },

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