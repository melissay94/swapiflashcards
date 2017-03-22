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
  '/main.js': htmlHandler.getMain, // Gets the client script
  '/media/milleniumFalcon.jpg': htmlHandler.getBackground, // Gets the site background
  '/media/title.png': htmlHandler.getTitle, // Gets the site title
  '/viewGamers': jsonHandler.getGamers,
  notFound: jsonHandler.notFound, // If not found, returns that error
};

// Handles GET requests
const getRequest = (request, response, parsedUrl) => {
  // Checks if the path name matches any of the ones in our url object.
  // If its not there, default to index as always
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

// Handles POST requests
const postRequest = (request, response, parsedUrl) => {
    // So we want to submit to the url
  if (parsedUrl.pathname === '/submit') {
    const pathResponse = response;

        // uploads come in as a byte stream to be reassembled
    const body = [];

        // Send a bad request if it errors out
    request.on('error', (err) => {
      console.log(err);
      pathResponse.statusCode = 400;
      pathResponse.end();
    });

        // Add each byte of data as it comes in
    request.on('data', (chunk) => {
      body.push(chunk);
    });

        // End of the upload stream
    request.on('end', () => {
            // Combine array and convert to a string
      const bodyString = Buffer.concat(body).toString();

            // Parse data into an object
      const bodyParams = query.parse(bodyString);

            // Pass to our updateGamer function
      jsonHandler.updateGamers(request, response, bodyParams);
    });
  }
};

// Handles all our http requests, as always. Except new and improved
const onRequest = (request, response) => {
    // Because I like knowing
  console.log(request.url);

    // Parse the url passed in so we can grab any section of it
  const parsedUrl = url.parse(request.url);

  // Checks for if its POST vs GET
  if (request.method === 'POST') { postRequest(request, response, parsedUrl); } else { getRequest(request, response, parsedUrl); }
};

// Creates a server and lets us know which one it got
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
