'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var BookSchema = require('mongoose').model('Book').schema;

var TradeSchema = new Schema({
  owner: String,
  trader: String,
  status: Number,
  // 0 = requested
  // 1 = accepted
  // 2 = request finish
  // 3 = finish trade
  book: [{type: Schema.Types.ObjectId, ref: 'Book'}]
});

module.exports = mongoose.model('Trade', TradeSchema);
