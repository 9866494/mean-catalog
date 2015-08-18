'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var PartSchema = new Schema({
  code: String,
  name: String,
});

module.exports = mongoose.model('Part', PartSchema);
