var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
    lowercase: true
  },
  loggedInCount: {
    type: Number,
    default: 0
  }
});