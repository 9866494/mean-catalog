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
  mode: String,
  description: String,
  note: String,
  deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Part', PartSchema);
