/* Object to hold gamer names and highscores
*  As users get different streaks, they will update their current name
*  Or they can add a new name to their board
*/
const gamers = {};

// Using the cryptography module for basic security with our etag
const crypt = require('crypto');

// Set up our etag with sha1, since we don't need super security for
// gamer names and scores
const etag = crypt.createHash('sha1').update(JSON.stringify(gamers));
const digest = etag.digest('hex');

// Responds with a JSON object based on status code
const respondJSON = (request, response, status, object) => {
  // Set up the headers with CORS support --> Hooray CORS
  const headers = {
    'access-control-allow-origin': '*', // Page urls allowed to access CORS
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS', // HTTP methods allowed to run
    'access-control-allow-headers': 'Content-type, accept', // Headers to accept the client
    'access-control-max-age': 10, // Number of seconds to allow each request to come in
    'Content-Type': 'application/JSON',
    etag: digest,
  };

  // Add status and header to the JSON object
  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// Responds without a JSON body if needed such as with 304
const respondJSONMeta = (request, response, status) => {
  // Set up the headers
  const headers = {
    'access-control-allow-origin': '*', // Page urls allowed to access CORS
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS', // HTTP methods allowed to run
    'access-control-allow-headers': 'Content-type, accept', // Headers to accept the client
    'access-control-max-age': 10, // Number of seconds to allow each request to come in
    'Content-Type': 'application/json',
    etag: digest,
  };

  // And then sends with no object
  response.writeHead(status, headers);
  response.end();
};

// Requests gamer object - responds with 200 or 304
const getGamers = (request, response) => {
  // Response json should be the gamers
  const responseMsg = {
    gamers,
  };

  // Check for conditions with the etag that would lead to a 304 code
  if (request.headers['if-none-match'] === digest) {
    // Using meta response because you can't add a body to a 304
    return respondJSONMeta(request, response, 304);
  }

  // Otherwise the request was fine, return 200
  return respondJSON(request, response, 200, responseMsg);
};

// Adds or updates a gamer from POST request
const updateGamers = (request, response, body) => {
  // Default message
  const responseJSON = {
    message: 'A gamer name is required to save scores',
  };

  // Just checking for if we got their name, the score should be taken from the page already
  if (!body.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // If user was successfully created
  let responseCode = 201;

  // If the gamer name already exists, update it with the new score
  if (gamers[body.name]) {
    responseCode = 204;
  } else {
    // If it doesn't make a new entry for them
    gamers[body.name] = {};
  }

  // Add or Update the fields
  gamers[body.name] = body.name;
  gamers[body.score] = body.score;

  // Set up the response
  if (responseCode === 201) {
    responseJSON.message = 'Gamer successfully added';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  // And if nothing else returned, then return the 204 code
  // Does not take a body, so we use the meta response
  return respondJSONMeta(request, response, responseCode);
};

// Sends the 404 status code for not found
const notFound = (request, response) => {
  const responseMsg = {
    message: 'This is not the page you are looking for',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseMsg);
};

// Export all this
module.exports = {
  getGamers,
  updateGamers,
  notFound,
};
