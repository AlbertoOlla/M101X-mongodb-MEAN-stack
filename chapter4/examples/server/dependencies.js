var fs = require('fs');
var fx = require('./fx');
var Stripe = require('stripe');

module.exports = function(wagner) {
  wagner.factory('Stripe', function(Config) {
    return Stripe(Config.stripeKey);
  });

  wagner.factory('fx', fx);

  wagner.factory('Config', function() {
    return JSON.parse(fs.readFileSync('./config.json').toString());
  });
};
