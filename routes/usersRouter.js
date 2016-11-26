"use strict";

const express = require('express'),
      controller = require('../controllers/usersController'),
      router = express.Router();

/* GET users listing. */
//router.get('/', controller.getUsers)

router.get('/', function(req, res, next) {
    var users = [
            {
                name: "matt",
                age: 33
            },
            {
                name: "marta",
                age: 32
            }
        ];
    res.render('users', {title: 'Users Page', users: users});
});

module.exports = router;
