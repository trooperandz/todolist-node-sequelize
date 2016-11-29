"use strict";

$(document).ready(function() {

    // Global regex patterns
    const validName = /^[A-Za-z]+$/,
          validNumber = /^[0-9]+$/,
          validEmail = /(^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$)|(^N\/A$)/,
          validPass = /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]{8,}$/,
          timeDelay = 3500;

    // Initialize dataTables
    //$('#users-table').DataTable();
    //$('#tasks-table').DataTable();
    $('table').DataTable();

    // Task table icon click handler
    $('table a').on('click', function(e) {
        e.preventDefault();

        initializeSpinner();

        // Determine which type of action based on name attribute (complete, edit, delete)
        let action = $(this).children('i').attr('name');

        // Grab the task id
        let id = $(this).data('id');

        // Prepare form data for transmission
        let formData = 'id=' + id;

        switch(action) {
            case 'complete':
                let url = '/tasks/update';
                $.ajax({
                    type: 'POST',
                    url: url,
                    data: formData
                }).done(function (response) {
                    setTimeout( () => {
                        // Remove spinner
                        removeSpinner();
                        if (response == 'success') {
                            console.log('task should be updated to completed')
                        }
                    }, timeDelay);
                });
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
            notify(msg, 'error');
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
})