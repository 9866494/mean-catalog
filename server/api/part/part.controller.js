'use strict';
var Part = require('./part.model');
var _ = require('lodash');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    console.log(err)
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    entity.images = [];
    entity.pdf = [];
    var updated = _.merge(entity, updates);
    updated.markModified('images');
    updated.markModified('pdf');
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

exports.list = function(req, res) {
  var query = {
    deleted: false
  }

  if (req.params.query) {
    var regexp = new RegExp(req.params.query, "i");
    query = {
      deleted: false,
      $or: [
        {code: regexp},
        {name_rus: regexp},
        {description: regexp},
      ]
    }
  }

  var
    limit = parseInt(req.params.limit),
    page = parseInt(req.params.page),
    skip = limit * page - limit
    ;

  Part.find(query)
    .count(function (err, count) {
      Part.find(query)
        .limit(limit)
        .skip(skip)
        .execAsync()
        .then(function (list) {
          var entity = {
            count: count,
            list: list
          };
          res.status(200).json(entity);
        })
        .catch(handleError(res));
    })

};


exports.get = function(req, res) {
  Part.findOne({_id: req.params.id})
    .execAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.create = function(req, res) {
  Part.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  Part.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.delete = function(req, res) {
  Part.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates({ deleted: true}))
    .then(responseWithResult(res))
    .catch(handleError(res));
};
