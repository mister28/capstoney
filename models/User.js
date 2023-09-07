const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new mongoose.Schema({
  firstName: String,
  lastName: String,
  Username : {type: String, required: true},
  Password: {type: String, required: true, minLength: 8},
  Email: {type: String, required: true},
  Chirps : {
    type: Schema.Types.ObjectId,
    ref: 'Chirp',
  },
  Friends : [String]
});

module.exports = mongoose.model('User', User);

