var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send('Hello, world!');
});

app.get('/user/:user', function(req, res) {
  res.send('Page for user ' + req.params.user);
});

app.listen(3000);
console.log('Server listening on port 3000!');