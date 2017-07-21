const mongoose = require('mongoose');
const Score = require('./score.js');

const Gamer = mongoose.model('Score');

// Set up getting the page
const getPage = (req, res) => {
  res.render('index');
};

// Get all gamers
const getAllGamers = (req, res) => {
  Gamer.find({}, (err, score) => {
    if (err) { res.send(err); }

    res.json(score);
  });
};

// Create a gamer
const createAGamer = (req, res) => {
  const newGamer = new Gamer(req.body);
  newGamer.save((err, score) => {
    if (err) { res.send(err); }

    res.json(score);
  });
};

module.exports.getPage = getPage;
module.exports.getAllGamers = getAllGamers;
module.exports.createAGamer = createAGamer;
