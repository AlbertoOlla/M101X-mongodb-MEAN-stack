var mongoose = require('mongoose');
var Category = require('./category');

var productSchema = {
  name: { type: String, required: true },
  // Pictures must start with "http://"
  pictures: [{ type: String, match: /^http:\/\//i }],
  price: {
    amount: { type: Number, required: true },
    // Only 3 supported currencies for now
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'GBP'],
      required: true
    }
  },
  category: Category.categorySchema
};

var schema = new mongoose.Schema(productSchema);

var currencySymbols = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£'
};

/*
 * Human-readable string form of price - "$25" rather
 * than "25 USD"
 */
schema.virtual('displayPrice').get(function() {
  return currencySymbols[this.price.currency] +
    '' + this.price.amount;
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = schema;
module.exports.productSchema = productSchema;