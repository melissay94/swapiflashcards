// Sends a json object
const respondJSON = (request, response, status, object) => {
    // Sets the status code and content type
  response.writeHead(status, { 'Content-type': 'application/json' });

    // Stringify object passed in to turn into a flat string just in case
    // Pass into the response
  response.write(JSON.stringify(object));

    // Sends the response to client
  response.end();
};

// Shows success status code
const success = (request, response) => {
    // Message to send
  const responseMsg = {
    message: 'This is a successful response',
  };

    // Sends response with the success code
  respondJSON(request, response, 200, responseMsg);
};

// Shows not found status code
const notFound = (request, response) => {
    // Error message for page not found
  const responseMsg = {
    message: 'This is not the page you are looking for',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseMsg);
};

/*  Exports to set functions as public
    So that's everything except for respondJSON cause we only
    need that internally to this file
*/
module.exports = {
  success,
  notFound,
};
