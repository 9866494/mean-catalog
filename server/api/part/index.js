'use strict';

var express = require('express');
var controller = require('./part.controller');
var router = express.Router();

router.get('/limit/:limit/page/:page/', controller.list);
router.get('/limit/:limit/page/:page/:query', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
