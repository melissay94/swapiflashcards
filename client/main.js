"use strict";

var SWAPI_URL = "http://swapi.co/api/";

var currentStreak = 0;
var filmData;

window.onload = init;

// Calls everything that should be called when the page has loaded w/out user interaction
function init() {
    // Initialize the data 
    getData();

    // Set up for posting gamer name
    var nameForm = document.querySelector('#gamerForm');
    var sendUser = (e) => sendPost(e, nameForm);
    nameForm.addEventListener('submit', sendUser);

    // Set up true false buttons
    var streak = document.querySelector("#score");
    document.querySelector("#trueBtn").onclick = function() {
        currentStreak += 1;
        streak.innerHTML = currentStreak;
        getData();
    };
    document.querySelector("#falseBtn").onclick = function() {
        currentStreak = 0;
        streak.innerHTML = currentStreak;
        getData();
    }
}

// Calls the api to get dat data
function getData(){
    
    // Adds a random number for a page
    var pageNum = Math.floor((Math.random() * 88) + 1);
    
    // Put the whole url together
    var url = SWAPI_URL + "people/" + pageNum;

    // And finally we make our request
    $.ajax({
        dataType: "json",
        url: url,
        data: null,
        success: loadData
    });
}


// Loads data that was successfully gotten into our data object
function loadData(obj){
    
    var name = obj.name;
    var gender = obj.gender;
    var eyeColor = obj.eye_color;

    var question = "<p>This character is " + gender + " and has " + eyeColor + " eyes.</p>";
    question += "<h4>Is it " + name + "?</h4>";

    document.querySelector("#card").innerHTML = question;
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
    console.log(formData, " name: ", nameField.value, " streak: ", currentStreak);

    // Send our request
    xhr.send(formData);

    // Prevent default action
    e.preventDefault();

    // Return false to keep browser from changing the page
    return false;
    
}
