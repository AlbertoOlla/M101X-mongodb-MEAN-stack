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

console.log(p.displayPrice); // "$5"

p.price.amount = 20;
console.log(p.displayPrice); // "$20"

// { ... "displayPrice": "$20", ... }
console.log(JSON.stringify(p));

var obj = p.toObject();
console.log(obj.displayPrice); // "$20"

// { ... "displayPrice": "$20", ... }
console.log(JSON.stringify(obj));
