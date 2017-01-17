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
