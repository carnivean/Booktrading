'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TradeSchema = new Schema({
  owner: String,
  trader: String,
  startdate: Number,
  endDate: Number
});

var BookSchema = new Schema({
  title: String,
  author: String,
  owner: String,
  isTraded: Boolean,
  Trades: []
});

module.exports = mongoose.model('Book', BookSchema);
