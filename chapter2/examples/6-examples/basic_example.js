var mongoose = require('mongoose');
var productSchema = require('./product');

var Product = mongoose.model('Product', productSchema);

var p = new Product({
  name: 'test',
  price: {
    amount: 5,
    currency: 'USD'
  },
  category: {
    name: 'test'
  }
});

p.name = 2;
console.log(p.name); // 2
console.log(p.$isValid('name')); // true

p.price.amount = 'Not a number';
p.validate(function(err) {
  // CastError because `price.amount` couldn't be
  // casted to a number
  console.log(err);
});
