const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chirp = new mongoose.Schema({
  Content : String,
  Username: String,
  Likes: {
    type: Number,
    default: 0 
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chirp', Chirp);
