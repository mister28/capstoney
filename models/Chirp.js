const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chirp = new mongoose.Schema({
  Content : String,
  Username: String,
  likes: {
    type: Number,
    default: 0 
  },
  Timestamp: {
    type: Date,
    default: Date.now,
  },
  profilePhoto: {
      type: String
  },
});

module.exports = mongoose.model('Chirp', Chirp);
