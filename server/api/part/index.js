'use strict';

var express = require('express');
var controller = require('./part.controller');
var router = express.Router();

router.get('/', controller.index);
router.get('/:query', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.update);

module.exports = router;
