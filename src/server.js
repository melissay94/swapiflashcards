// Require packages
const path = require('path');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const cors = require('cors');

// Require route folder
const router = require('./router.js');

const port = process.env.PORT || 3000;

const mongoURL = process.env.MONGODB || 'mongob://localhost/swapi';

// Set up mongoose
mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, (err) => {
  if (err) {
    console.log('Error connecting to database');
    throw err;
  }
});

// Define express app
const app = express();

// Use cors cause this doesn't have anything sensative
app.use(cors());

// Set up route for the assets folder ie images
app.use('/assets', express.static(path.resolve(`${__dirname}/../client`)));

// Parse POST requests as application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse for JSON too
app.use(bodyParser.json());

// Set up views for handlebars
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

// Set template director
app.set('views', `${__dirname}/../client/view`);

// Set up favicon path
app.use(favicon(`${__dirname}/../client/media/lightsaber.png`));

// Pass app to router to map route
router(app);

// Connect to port
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
