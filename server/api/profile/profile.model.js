'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProfileSchema = new Schema({
  name: String,
  city: String,
  state: String,
  username: String
});

module.exports = mongoose.model('Profile', ProfileSchema);
