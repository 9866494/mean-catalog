'use strict';

var express = require('express');
var controller = require('./files.controller');
var router = express.Router();

router.post('/pdf', controller.file);
router.post('/image', controller.file);

module.exports = router;
