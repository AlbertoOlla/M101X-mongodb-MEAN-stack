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

console.log(p.internal.approximatePriceUSD); // 5

p.price.amount = 88;
console.log(p.internal.approximatePriceUSD); // 88

p.price.currency = 'EUR';
console.log(p.internal.approximatePriceUSD); // 80
p.price.amount = 11;
console.log(p.internal.approximatePriceUSD); // 10
