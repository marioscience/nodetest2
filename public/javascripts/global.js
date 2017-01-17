/**
 * Created by mmatos on 1/17/2017.
 */
// Userlist data array for filling in info box
var userListData = [];

// DOM Ready
$(document).ready(function () {
    // Populate the user table on initial page load
    populateTable();

    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    $('#btnAddUser').on('click', addUser);
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
});

// Functions
// Fill table with data
function populateTable() {

    var tableContent = "";

    $.getJSON('/users/userlist', function (data) {

        // Save userlist into an array
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function () {
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Injecting the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
}

function showUserInfo(event) {

    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map( function (arrayItem) { return arrayItem.username; }).indexOf(thisUserName);

    // Get our User object
    var thisUserObject = userListData[arrayPosition];

    // Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);
}

// Add User
function addUser (event) {
    event.preventDefault();

    // Super basic validation - increase error count variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function (index, val) {
        if ($(this).val() === '') {errorCount++}
    });

    // Check and amek sure errorCount's still at zero
    if (errorCount === 0) {
        // If it is, compile all user info into one object
        var newUser = {
            'username': $('#addUser fieldset input#inputUserName').val(),
            'email': $('#addUser fieldset input#inputUserEmail').val(),
            'fullname': $('#addUser fieldset input#inputUserFullname').val(),
            'age': $('#addUser fieldset input#inputUserAge').val(),
            'location': $('#addUser fieldset input#inputUserLocation').val(),
            'gender': $('#addUser fieldset input#inputUserGender').val()
        };

        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function (response) {

            // Check for succesful blank response
            if (response.msg === '') {
                // Clear form inputs
                $('#addUser fieldset input').val('');

                //Update Table
                populateTable();
            } else {
                // If something goes wrong, alert the error message
                alert("Error: " + response.msg);
            }
        });
    } else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
}

function deleteUser (event) {
    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm("Yes! you DO want to delete that record. It was stupid anyways.");

    // Check and make sure the user confirmed
    if (confirmation === true) {
        // If they did
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function (response) {
            // Check for success
            if (response.msg === '') {
            } else {
                alert('Error: ' + response.msg)
            }

            // Update the table
            populateTable();
        });
    } else {
        // Do Nothing if they said no
        return false;
    }
}
