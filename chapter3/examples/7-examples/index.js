var express = require('express');
var wagner = require('wagner-core');

require('./models')(wagner);

var app = express();
app.use(wagner.invoke(function(User) {
  return function(req, res, next) {
    User.findOne({}, function(error, user) { req.user = user; next(); });
  };
}));
app.use('/api/v1', require('./api')(wagner));

app.listen(3000);
console.log('Listening on port 3000!');
