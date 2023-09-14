const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chirp = new mongoose.Schema({
  Content : String,
  Username: String,
  likes: {
    type: Number,
    default: 0 
  }
});

module.exports = mongoose.model('Chirp', Chirp);
