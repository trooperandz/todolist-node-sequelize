"use strict";

module.exports = {
    getUsers: function(req, res) {
        // Get query results
        var users = [
            {
                name: "matt",
                age: 33
            },
            {
                name: "marta",
                age: 32
            }
        ]
        res.render('users', {title: 'Users Page', users: users})
    }
}