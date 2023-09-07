const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const Chirp = new mongoose.Schema({
  Chirp : [String],
  Author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

});

module.exports = mongoose.model('Chirp', Chirp);
