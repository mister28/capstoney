const mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

const Users = new mongoose.Schema({
  Username : {type: String, required: true},
  Password: {type: String, required: true},
  Email: {type: String, required: true},
  Tweets : [Number],
  Friends : [String],
});

module.exports = mongoose.model('User', Users);

