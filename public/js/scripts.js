"use strict";

$(document).ready(function() {

    // Global regex patterns
    const validName = /^[A-Za-z]+$/,
          validNumber = /^[0-9]+$/,
          validEmail = /(^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$)|(^N\/A$)/,
          validPass = /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,}$/,
          timeDelay = 1900,
          pendTableId = 'tasks-pending',
          compTableId = 'tasks-completed';

    // Initialize dataTables
    initDataTables()

    // Task table icon click handler
    $('table a').on('click', function(e) {
        e.preventDefault()

        initializeSpinner()

        // Determine which type of action based on name attribute (complete, edit, delete)
        let action = $(this).children('i').attr('name');

        // Grab the task id
        let id = $(this).data('id');

        // Grab the table row
        let tableRow = $(this).parent().parent()

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
                        removeSpinner()
                        if(response == 'success') {
                            // Remove the selected row from pending table and move to completed table
                            $('#'+pendTableId).DataTable().row(tableRow).remove().draw()
                            $('#'+compTableId).DataTable().row.add(tableRow).draw()
                            notify('Task was moved to completed!', 'success')
                        }
                    }, timeDelay)
                })
                break;
            case 'reactivate':
                $.ajax({
                    type: 'POST',
                    url: '/tasks/reactivate',
                    data: formData
                }).done(response => {
                    setTimeout(() => {
                        removeSpinner()
                        if(response == 'success') {
                            // Remove the selected row from completed table and move to pending table
                            $('#'+compTableId).DataTable().row(tableRow).remove().draw()
                            $('#'+pendTableId).DataTable().row.add(tableRow).draw()
                            console.log('reactivated')
                        }
                    }, timeDelay)
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
                            let tableId = '#' + tableRow.parent().parent().attr('id')
                            $(tableId).DataTable().row(tableRow).remove().draw()
                            notify('Task successfully removed!', 'success')
                        }
                    }, timeDelay)
                })
                break;
        }

    })

    // Show form errors if any occurred
    function checkErrors(errorArr) {
        if (errorArr.length > 0) {
            var msg = '';
            errorArr.forEach(function (error) {
                msg += error;
            });
            // Show error notification
            notify(msg, 'error', 'right');
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
        $('table').DataTable()
    }

    // Return globally-positioned notification, from notify js plugin
    function notify(msg, type, position) {
        return $.notify(
            msg,
            type,
            {
                position: position,
                autoHideDelay: 5000
            }
        );
    }
})