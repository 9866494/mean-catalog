'use strict';

var express = require('express');
var controller = require('./part.controller');
var router = express.Router();

router.get('/limit/:limit/page/:page/', controller.index);
router.get('/limit/:limit/page/:page/:query', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
