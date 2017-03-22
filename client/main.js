"use strict";

var SWAPI_URL = "http://swapi.co/api/";
var swapi_data = [];
var request_types = ["films", "people", "planets"];

var currentStreak = 0;

window.onload = init;

// Calls everything that should be called when the page has loaded w/out user interaction
function init() {
    // Initialize the data wih five objects
    for (var i = 0; i < 5; i++) {
        getData();
    }

    // Set up for posting gamer name
    var nameForm = document.querySelector('#gamerForm');
    var sendUser = sendPost(e, nameForm);
    nameForm.addEventListener('submit', sendUser);
}

// Calls the api to get dat data
function getData(){
    
    // Gets a category that can be searched on the api
    var type = request_types[Math.floor((Math.random() * (request_types.length-1)))];
    
    // Adds a random number based on type since there is a different amount of info based on category
    var pageNum;
    switch(type) {
        case "films":
            pageNum = Math.floor((Math.random() * 7) + 1);
            break;
        case "people":
            pageNum = Math.floor((Math.random() * 88) + 1);
            break;
        case "planets":
            pageNum = Math.floor((Math.random() * 61) + 1);
            break;
    }
    
    // Put the whole url together
    var url = SWAPI_URL + type + "/" + pageNum;
    console.log(url);
    // And finally we make our request
    $.ajax({
        dataType: "json",
        url: SWAPI_URL,
        data: null,
        success: loadData
    });
}

// Loads data that was successfully gotten into our data object
function loadData(obj){
    console.log(obj);
}

// Will format recieved obj into a question to appear on the flash card
function formatQuestion(data) {
    console.log(data);
}

// Sends post request to add or update a gamer's score
function sendPost(e, nameForm) {

    // Grabs actions from the forms
    const nameAction = nameForm.getAttribute('action');
    const nameMethod = nameForm.getAttribute('method');

    // Our form will only have the gamer's name, they don't submit their score
    const nameField = nameForm.querySelector('#name');

    // Create an AJAX request
    const xhr = new XMLHttpRequest();

    // Set the method and action
    xhr.open(nameMethod, nameAction);

    // Set the request type 
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Set the request type for a JSON response
    xhr.setRequestHeader('Accept', 'application/json');

    // Build our request format, the same as a query string
    const formData = `name=${nameField.value}&score={currentStreak}`;

    // Send our request
    xhr.send(formData);

    // Prevent default actgion
    e.preventDefault();

    // Return false to keep browser from changing the page
    return false;
    
}
