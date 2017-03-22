"use strict";

var SWAPI_URL = "http://swapi.co/api/";
var swapi_data = [];
var request_types = ["films", "people", "planets"];

window.onload = init;

// Calls everything that should be called when the page has loaded w/out user interaction
function init() {
    // Initialize the data wih five objects
    for (var i = 0; i < 5; i++) {
        getData();
    }
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

function formatQuestion(data) {
    console.log(data);
}