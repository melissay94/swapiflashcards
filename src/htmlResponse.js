// Woohoo lets grab dem pages
const fs = require('fs');

/* Loads index and css fully into memory
   Not usually a great idea but is being used
   for simplicity.
   Ideal is no synchronous ops or loading entire
   files into memory
*/
const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const style = fs.readFileSync(`${__dirname}/../client/style.css`);
const main = fs.readFileSync(`${__dirname}/../client/main.js`);
const background = fs.readFileSync(`${__dirname}/../client/media/milleniumFalcon.jpg`);
const title = fs.readFileSync(`${__dirname}/../client/media/title.png`);

// Handles index page request
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Handles css page request
const getStyle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(style);
  response.end();
};

// Handles getting main script
const getMain = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/javascript' });
  response.write(main);
  response.end();
};

// Handles image request
const getBackground = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/jpeg' });
  response.write(background);
  response.end();
};

const getTitle = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(title);
  response.end();
};

// Exports to set functions to public
module.exports = {
  getIndex,
  getStyle,
  getMain,
  getBackground,
  getTitle,
};
