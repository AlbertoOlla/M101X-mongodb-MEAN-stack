var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');

module.exports = function(wagner) {
  var api = express.Router();

  api.use(bodyparser.json());

  api.get('/product/text/:query', wagner.invoke(function(Product) {
    return function(req, res) {
      Product.
        find(
          { $text : { $search : req.params.query } },
          { score : { $meta: 'textScore' } }).
        sort({ score: { $meta : 'textScore' } }).
        limit(10).
        exec(handleMany.bind(null, 'products', res));
    };
  }));

  return api;
};

function handleMany(property, res, error, result) {
  if (error) {
    console.log(error);
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}
