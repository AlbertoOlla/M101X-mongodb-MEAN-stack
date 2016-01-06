var Stripe = require('stripe');
var fx = require('./fx');

module.exports = function(wagner) {
  var stripe = Stripe(process.env.STRIPE_API_KEY);

  wagner.factory('Stripe', function() {
    return stripe;
  });

  wagner.factory('fx', fx);
};
