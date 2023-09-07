const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chirp = new mongoose.Schema({
  Content : String,
  Author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: {
    type: Number,
    default: 0 
  },
  dislikes: {
    type: Number,
    default: 0 
  }

});

module.exports = mongoose.model('Chirp', Chirp);
