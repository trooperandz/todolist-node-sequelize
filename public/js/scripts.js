'use strict';

$(document).ready(function() {
    // Global regex patterns
    const validName = /^[A-Za-z]+$/,
          validNumber = /^[0-9]+$/,
          validEmail = /(^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$)|(^N\/A$)/,
          validPass = /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,}$/,
          timeDelay = 1200,
          pendTableId = 'tasks-pending',
          compTableId = 'tasks-completed';

    // Initialize dataTables
    initDataTables();

    // Task table icon click handler
    $('table.task').on('click', 'a', function(e) {
        e.preventDefault();

        initializeSpinner();

        // Determine which type of action based on name attribute (complete, edit, delete)
        let action = $(this).children('i').attr('name');

        // Grab the anchor id
        let id = $(this).data('id');

        // Grab the table row
        let tableRow = $(this).parent().parent();

        // Grab all table <td> text for insertion into new DataTables row
        let name = tableRow.children().eq(1).text();
        let title = tableRow.children().eq(2).text();
        let notes = tableRow.children().eq(3).text();
        let category = tableRow.children().eq(4).text();
        let updatedAt = tableRow.children().eq(5).text();

        // Prepare form data for transmission
        let formData = 'id=' + id;

        switch(action) {
            case 'completed':
                $.ajax({
                    type: 'POST',
                    url: '/tasks/update',
                    data: formData
                }).done(response => {
                    setTimeout(() => {
                        removeSpinner();
                        // Note: response contains table <td> markup under 'Action' column
                        if(response) {
                            console.log('response: ' + response);
                            // Remove the selected row from pending table and move to completed table
                            $('#'+pendTableId).DataTable().row(tableRow).remove().draw();
                            $('#'+compTableId).DataTable().row.add([
                                response,
                                name,
                                title,
                                notes,
                                category,
                                updatedAt,
                            ]).draw();
                            notify('thead', 'Task was moved to completed!', 'success', 'top left');
                        }
                    }, timeDelay);
                })
                break;

            case 'edit':
                // Take no action until code instructions are complete
                showAlertModal('This action is coming soon!');
                removeSpinner();
                return false;
                break;

            case 'reactivate':
                $.ajax({
                    type: 'POST',
                    url: '/tasks/reactivate',
                    data: formData
                }).done(response => {
                    setTimeout(() => {
                        removeSpinner();
                        // Note: response contains table <td> markup under 'Action' column
                        if(response) {
                            // Remove the selected row from completed table and move to pending table
                            $('#'+compTableId).DataTable().row(tableRow).remove().draw();
                            $('#'+pendTableId).DataTable().row.add([
                                response,
                                name,
                                title,
                                notes,
                                category,
                                updatedAt,
                            ]).draw();
                            notify('thead', 'Task was moved back to pending!', 'success', 'top left');
                        }
                    }, timeDelay);
                })
                break;

            case 'delete':
                $.ajax({
                    type: 'POST',
                    url: '/tasks/delete',
                    data: formData
                }).done(response => {
                    setTimeout(() => {
                        removeSpinner();
                        if(response == 'success') {
                            // Remove the table row
                            let tableId = '#' + tableRow.parent().parent().attr('id');
                            $(tableId).DataTable().row(tableRow).remove().draw();
                            notify('thead', 'Task successfully removed!', 'success', 'top left');
                        }
                    }, timeDelay);
                })
                break;
        }
    });

    // User table icon click handler
    $('table.user a').on('click', function(e) {
        e.preventDefault();

        initializeSpinner();

        // Determine which type of action based on name attribute (complete, edit, delete)
        let action = $(this).children('i').attr('name');

        // Grab the anchor id
        let id = $(this).data('id');

        // Grab the table row
        let tableRow = $(this).parent().parent();

        // Prepare form data for transmission
        let formData = 'id=' + id;

        switch(action) {
            case 'update':
                // Take no action until code instructions are complete
                showAlertModal('This action is coming soon!');
                removeSpinner();
                return false;
                break;
                /* Use this code when complete user edit action
                $.ajax({
                    type: 'POST',
                    url: '/users/create',
                    data: formData
                }).done(response => {
                    setTimeout(() => {
                        removeSpinner();
                        if(response == 'success') {
                            // Remove the selected row from pending table and move to completed table
                            $('#'+pendTableId).DataTable().row(tableRow).remove().draw();
                            $('#'+compTableId).DataTable().row.add(tableRow).draw();
                            notify('New user added successfully!', 'success');
                        }
                    }, timeDelay);
                })*/
                break;
            case 'delete':
                $.ajax({
                    type: 'POST',
                    url: '/users/delete',
                    data: formData
                }).done(response => {
                    setTimeout(() => {
                        removeSpinner();
                        if(response == 'success') {
                            // Remove the table row
                            let tableId = '#' + tableRow.parent().parent().attr('id');
                            $(tableId).DataTable().row(tableRow).remove().draw();
                            notify('thead', 'User successfully removed!', 'success', 'top left');
                        }
                    }, timeDelay);
                });
                break;
        }
    });

    // Task form submit handler
    $('#task-form button').on('click', function(e) {
        e.preventDefault();

        // Grab inputs
        let title = $('#title').val();
        let notes = $('#notes').val();
        let completed = 0;
        let name = $('#UserId option:selected').text();
        let UserId = $('#UserId option:selected').val();
        let category = $('#CategoryId option:selected').text();
        let CategoryId = $('#CategoryId option:selected').val();

        // Save inputs for use in task table append action
        let createdAt = moment().format('MM/DD/YYYY');

        // Validate inputs
        let errorArr = [];

        if (title == '') {
            errorArr.push('You entered an invalid task description. \n');
        }
        if (UserId == '') {
             errorArr.push('You must select a user. \n');
        }
        if (!CategoryId) {
             errorArr.push('You must select a category.');
        }

        if(checkErrors(errorArr)) {
            return false;
        }

        let formData = $('#task-form').serialize();

        initializeSpinner();

        $.ajax({
            type: 'POST',
            url: '/tasks/addTask',
            data: formData
        }).done(response => {
            setTimeout(() => {
                removeSpinner();
                if(response) {
                    // Add new task to the task table
                    $('#'+pendTableId).DataTable().row.add([
                        response,
                        name,
                        title,
                        notes,
                        category,
                        createdAt,
                    ]).draw();

                    // Simulate user click event on Users tab, to display updated User table
                    //$('ul.nav-tabs').children()

                    // Clear form inputs
                    $('#task-form input').val('');
                    $("#task-form select").val('');
                    $('form').notify('The task was added successfully!', 'success', 'right');
                    // notify('thead', 'User was added successfully!', 'success', 'right');
                } else {
                    $.notify('There was an internal server error!', 'error', 'right');
                }
            }, timeDelay);
        });
    });

    // User form submit handler
    $('#user-form button').on('click', function(e) {
        e.preventDefault();

        // Grab inputs
        let firstName = $('#firstName').val();
        let lastName = $('#lastName').val();
        let userName = $('#userName').val();
        let email = $('#email').val();
        let password = $('#password').val();

        // Save inputs for use in users table append action
        let createdAt = moment().format('MM/DD/YYYY');
        var userObj = {
            firstName,
            lastName,
            userName,
            email,
            createdAt,
        }

        // Validate inputs
        let errorArr = [];

        if (firstName == '') {
            errorArr.push('You entered an invalid First Name. \n');
        }
        if (lastName == '') {
             errorArr.push('You entered an invalid Last Name. \n');
        }
        if (userName == '') {
             errorArr.push('You entered an invalid Username. \n');
        }
        if (!validEmail.test(email)) {
             errorArr.push('You entered an invalid Email Address. \n');
        }
        if (!validPass.test(password)) {
            errorArr.push('Your password did not meet the minimum requirements.');
        }

        if(checkErrors(errorArr)) {
            return false;
        }

        let formData = $('#user-form').serialize();

        initializeSpinner();

        $.ajax({
            type: 'POST',
            url: '/users/create',
            data: formData
        }).done(response => {
            setTimeout(() => {
                removeSpinner();
                if(response == 'success') {
                    // Add new user to the user table
                    $('table.user').DataTable().row.add([
                        '<a href="/edit"><i class="glyphicon glyphicon-pencil" name="create" data-toggle="tooltip data-placement="bottom" title="Edit User"></i></a> &nbsp;<a href="/remove"><i class="glyphicon glyphicon-remove" name="delete" data-toggle="tooltip" data-placement="bottom" title="Delete User"></i></a>',
                        firstName,
                        lastName,
                        userName,
                        email,
                        createdAt
                    ]).draw();

                    // Simulate user click event on Users tab, to display updated User table
                    //$('ul.nav-tabs').children()

                    // Clear form inputs
                    $('#user-form input').val('');
                    $('form').notify(firstName + ' was added successfully!', 'success', 'right');
                    // notify('thead', 'User was added successfully!', 'success', 'right');
                }
            }, timeDelay);
        });
    });

    // Activate alert modal
    function showAlertModal(msg) {
        // Fill in message and show the modal
        $('.alert-modal p').text(msg);
        $('.alert-modal').modal('show');
    }

    // Show form errors if any occurred
    function checkErrors(errorArr) {
        if (errorArr.length > 0) {
            var msg = '';
            errorArr.forEach(function (error) {
                msg += error;
            });
            console.log('msg: ' + msg);
            // Show error notification
            $.notify(msg, 'error', 'right');
            // notify('', msg, 'error', 'right');
            return true;
        } else {
            return false;
        }
    }

    // Load the spinner
    function initializeSpinner() {
        $('div.spinner-div').html('<div class="spinner">Loading...</div>');
    }

    // Remove the spinner
    function removeSpinner() {
        $('div.spinner-div').empty();
    }

    // Activate dataTables
    function initDataTables() {
        $('table').DataTable();
    }

    // Return globally-positioned notification, from notify js plugin
    function notify(element, msg, type, position) {
        return $(element).notify(
            msg,
            type,
            {
                position: position,
                autoHideDelay: 5000
            }
        );
    }
});