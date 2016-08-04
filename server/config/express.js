/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/../../client/file_uploads/');
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({ storage: storage });


module.exports = function(app) {
  var env = app.get('env');

  app.set('views', config.root + '/server/views');
  app.set('view engine', 'jade');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.set('appPath', path.join(config.root, 'client'));
  app.use(upload.any());

  if ('production' === env) {
    app.use(function (req, res, next) {
      var nodeSSPI = require('node-sspi');
      var nodeSSPIObj = new nodeSSPI({
        retrieveGroups: true
      });

      nodeSSPIObj.authenticate(req, res, function(err){
        res.finished || next();
      });
    });

    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use(express.static(path.join(app.get('appPath'), './server/file_uploads/')));
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(app.get('appPath')));
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
