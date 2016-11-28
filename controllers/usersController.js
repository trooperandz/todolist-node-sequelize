"use strict";

const models = require('../models'),
      moment = require('moment'),
      passwordMod = require('machinepack-passwords'),
      validEmail = /(^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$)|(^N\/A$)/,
      validPass = /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,}$/;

module.exports = {
    getUsers: function(req, res) {
        return module.exports.renderUsers(req, res);
    },

    addUser: function(req, res) {

        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let userName = req.body.userName;
        let email = req.body.email;
        let password = req.body.password;

        let errorArr = [];

        if(firstName == '') {
            errorArr.push('You entered an invalid First Name. \n')
        }
        if(lastName == '') {
            errorArr.push('You entered an invalid Last Name. \n')
        }
        if(userName == '') {
            errorArr.push('You entered an invalid Username. \n')
        }
        if(!validEmail.test(email)) {
            errorArr.push('You entered an invalid Email Address.')
        }
        if(!validPass.test(password)) {
            errorArr.push('Your password did not meet the minimum requirements.')
        }

        // Encrypt password
        passwordMod.encryptPassword({password}).exec({
            error: function(err) {
                errorArr.push("There was a password encryption error!")
            },
            success: function(encryptedPassword) {
                console.log('fn: ' + firstName + 'ln: ' + lastName + 'user: ' + userName + 'email: ' + email + 'pass: ' + encryptedPassword)
                // First, check for errors to ensure that invalid data is not inserted into db
                if(errorArr.length > 0) {
                    return module.exports.renderUsers(req, res, errorArr)
                }
                models.User.create({firstName, lastName, userName, email, password:encryptedPassword}).then(function(user) {
                    // Return user to /users route.  If not, will keep /users/addUser route and will display errors on page reload
                    return res.redirect('/users')
                })
            }
        })
    },

    formatDate: function(userArr) {
        userArr.forEach((user, index) => {
            user.dataValues.createdAt = moment(user.dataValues.createdAt).format('MM/DD/YYYY')
        })
        return userArr;
    },

    renderUsers: function(req, res, errorArr) {
        models.User.findAll().then(users => {
            users = module.exports.formatDate(users);
            res.render('users', {title: 'System Users', users: users, errors: errorArr})
        })
    },

    getErrors: function(errorArr) {

    }
}