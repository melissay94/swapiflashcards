// Import packages
const mongoose = require('mongoose');

// Declare schema
const Schema = mongoose.Schema;
let ScoreModel = {};

// Set up schema
const ScoreSchema = new Schema({

  gamerTag: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,24}$/,
  },
  score: {
    type: Number,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

ScoreModel = mongoose.model('Score', ScoreModel);

module.exports.ScoreModel = ScoreModel;
module.exports.ScoreSchema = ScoreSchema;
