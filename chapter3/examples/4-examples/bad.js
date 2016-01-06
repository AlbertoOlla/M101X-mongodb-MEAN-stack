var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var userSchema = new mongoose.Schema({
  name: String
});
var User = mongoose.model('User', userSchema);

User.create({ name: 'John' }, function(error, doc) {
  console.log(require('util').inspect(doc));
});
