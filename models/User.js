const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

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
  Friends : [String],
});

User.pre('save', async function (next) {
  if (this.isModified('Password')) {
    try {
      const hashedPassword = await bcrypt.hash(this.Password, 10);
      this.Password = hashedPassword;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('User', User);

