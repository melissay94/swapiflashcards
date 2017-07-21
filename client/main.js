"use strict";

var SWAPI_URL = "http://swapi.co/api/";

var currentStreak = 0;
var answerSide = false;
var filmData;

window.onload = init;

// Calls everything that should be called when the page has loaded w/out user interaction
function init() {

    // Get all gamers and scores to populate scoreboard
    sendAjax('GET', '/gamers', null, (data) => {
        displayData(data);
    });

    getData();

    // Set up flipping of the cards based on which side it i
    document.querySelector("#trueBtn").onclick = function() {
        if (!answerSide) {
            flip();
            var answer = "<h4>You got it!</h4>";
            document.querySelector("#response").innerHTML = answer;
            currentStreak++;
            // Update current streak
            document.querySelector("#score").innerHTML = currentStreak;
        }
    };
    document.querySelector("#falseBtn").onclick = function() {
        if (!answerSide) {
            flip();
            var answer = "<h4>Nope! Try again.</h4>";
            document.querySelector("#response").innerHTML = answer;
            document.querySelector("#gamerForm").style = "display:block";
            currentStreak = 0;
        }
    };
    document.querySelector("#nextBtn").onclick = function() {
        getData();
        flip();
        document.querySelector("#gamerForm").style = "display:none";
    };

    // Add submit event listener for form
    document.querySelector("#gamerForm").addEventListener('submit', sendGamer);

}

// Handles the actual flipping of the card by adding the flip cards
function flip() {
    document.querySelector("#card").classList.toggle("flip");
    answerSide = !answerSide;

}

// Display data from our gamer api
function displayData(data) {

    // Empty string to add list of scores to
    var html = "";

    var length = data.length < 10 ? data.length : 10;

    html += "<ul id='scoreList' >";

    for (var i = 0; i < length; i++) {
        var score = data[i];

        html +="<li><h4> Studier " + score.gamerTag;
        html +=  ": Streak: " + score.score + "</h4></li>";
    }

    html += "</ul>";
    document.querySelector('#scoreboard').innerHTML = html;

}

// Calls the api to get dat data
function getData(){
    
    // Adds a random number for a page
    var pageNum = Math.floor((Math.random() * 88) + 1);
    
    // Put the whole url together
    var url = SWAPI_URL + "people/" + pageNum;

    sendAjax('GET', url, null, (data) => {
        loadData(data);
    });

}


// Loads data that was successfully gotten into our data object
function loadData(obj){
    
    var name = obj.name;
    var gender = obj.gender;
    var question;

    if (gender === 'female'  || gender === 'male' ) {
        gender = obj.gender;
        question = "<p>This character is " + gender + " and has ";
    }
    else
        question = "<p>This character has ";


    var eyeColor = obj.eye_color;
    question += eyeColor + " eyes.</p>"
    var episodes = ['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi', 'The Phantom Menance', 'Attack of the Clones', 'Revenge of the Sith', 'The Force Awakens'];

;
    question += "<p>They appeared in </p><ul>"

    for (var i = 0; i < obj.films.length; i++) {
        var film = obj.films[i].slice(obj.films[i].length-2, obj.films[i].length-1);
        question += "<li>" + episodes[parseInt(film) - 1] + " </li>";
    }

    question += "</ul><h4>Is it " + name + "?</h4>";
    document.querySelector(".front").innerHTML = question;
    return;
}

// Sends ajax calls
const sendAjax = (type, action, data, success) => {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: 'json',
        success: success,
        error: function(xhr, status, error) {
            var msgObj = JSON.parse(xhr.responseText);
            console.log(msgObj);
        }

    })
}

// Sends post request to add or update a gamer's score
function sendGamer(e) {

    // Prevent default action
    e.preventDefault();

    const name = document.querySelector("#nameField");
    const score = document.querySelector("#score").innerHTML;

    if (!name.value || score < 0) {
        return false;
    }

    var gamerData = JSON.stringify({ "gamerTag": name.value, "score": parseInt(score) });
    gamerData = JSON.parse(gamerData);

    sendAjax('POST', '/gamers', gamerData);

    // Get all gamers and scores to populate scoreboard
    sendAjax('GET', '/gamers', null, (data) => {
        displayData(data);
    });

    document.querySelector("#nameField").value = '';

        getData();
        flip();
        document.querySelector("#gamerForm").style = "display:none";

    // Return false to keep browser from changing the page
    return false;
    
}
