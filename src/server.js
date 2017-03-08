// http module
const http = require('http');

// url module
const url = require('url');

// string module
const query = require('querystring');

// project files
const htmlHandler = require('./htmlResponse.js');
const jsonHandler = require('./jsonResponse.js');

// Add port
const port = process.env.port || process.env.NODE_PORT || 3000;

// Looks up url routes with a key:value object to match the request to a function
const urlStruct = {
  '/': htmlHandler.getIndex, // Gets the home page
  '/style.css': htmlHandler.getStyle, // Gets the styles page
    notFound: jsonHandler.notFound,
};

// Handles all our http requests, as always. Except new and improved
const onRequest = (request, response) => {
    // Because I like knowing
  console.log(request.url);

    // Parse the url passed in so we can grab any section of it
  const parsedUrl = url.parse(request.url);

    // Grabs the query parameters to parse them into a reuseable object
  const params = query.parse(parsedUrl.query);

    // Checks if the path name matches any of the ones in our url object.
    // If its not there, default to index as always
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, params);
  } else {
    urlStruct.notFound(request, response, params);
  }
};

// Creates a server and lets us know which one it got
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);