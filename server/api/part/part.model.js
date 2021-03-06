'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var PartSchema = new Schema({
  code: String,
  name_ger: String,
  name_rus: String,
  tn_code: String,
  country: String,
  manufacture: String,
  trade_mark: String,
  model: String,
  technical_passport: String,
  barcode: String,
  mark: String,
  description: String,
  note: String,
  images: [],
  pdf: [],
  deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Part', PartSchema);
