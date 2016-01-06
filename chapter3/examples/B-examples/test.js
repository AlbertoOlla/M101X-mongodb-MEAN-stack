var assert = require('assert');
var express = require('express');
var status = require('http-status');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';
var PRODUCT_ID = '000000000000000000000001';

describe('Text Search API', function() {
  var server;
  var Category;
  var Product;
  var Stripe;
  var User;

  before(function() {
    var app = express();

    // Bootstrap server
    require('./models')(wagner);
    require('./dependencies')(wagner);

    // Make models available in tests
    var deps = wagner.invoke(function(Category, Product, Stripe, User) {
      return {
        Category: Category,
        Product: Product,
        Stripe: Stripe,
        User: User
      };
    });

    Category = deps.Category;
    Product = deps.Product;
    Stripe = deps.Stripe;
    User = deps.User;

    app.use(function(req, res, next) {
      User.findOne({}, function(error, user) {
        assert.ifError(error);
        req.user = user;
        next();
      });
    });

    app.use(require('./api')(wagner));

    server = app.listen(3000);
  });

  after(function() {
    // Shut the server down when we're done
    server.close();
  });

  beforeEach(function(done) {
    // Make sure categories are empty before each test
    Category.remove({}, function(error) {
      assert.ifError(error);
      Product.remove({}, function(error) {
        assert.ifError(error);
        User.remove({}, function(error) {
          assert.ifError(error);
          done();
        });
      });
    });
  });

  beforeEach(function(done) {
    var categories = [
      { _id: 'Electronics' },
      { _id: 'Phones', parent: 'Electronics' },
      { _id: 'Laptops', parent: 'Electronics' },
      { _id: 'Bacon' }
    ];

    var products = [
      {
        name: 'LG G4',
        category: { _id: 'Phones', ancestors: ['Electronics', 'Phones'] },
        price: {
          amount: 300,
          currency: 'USD'
        }
      },
      {
        _id: PRODUCT_ID,
        name: 'Asus Zenbook Prime',
        category: { _id: 'Laptops', ancestors: ['Electronics', 'Laptops'] },
        price: {
          amount: 2000,
          currency: 'USD'
        }
      },
      {
        name: 'Flying Pigs Farm Pasture Raised Pork Bacon',
        category: { _id: 'Bacon', ancestors: ['Bacon'] },
        price: {
          amount: 20,
          currency: 'USD'
        }
      }
    ];

    var users = [{
      profile: {
        username: 'vkarpov15',
        picture: 'http://pbs.twimg.com/profile_images/550304223036854272/Wwmwuh2t.png'
      },
      data: {
        oauth: 'invalid',
        cart: []
      }
    }];

    Category.create(categories, function(error) {
      assert.ifError(error);
      Product.create(products, function(error) {
        assert.ifError(error);
        User.create(users, function(error) {
          assert.ifError(error);
          done();
        });
      });
    });
  });

  it('can search by text', function(done) {
    var url = URL_ROOT + '/product/text/asus';
    // Get products whose name contains 'asus'
    superagent.get(url, function(error, res) {
      assert.ifError(error);
      assert.equal(res.status, status.OK);

      var results;
      assert.doesNotThrow(function() {
        results = JSON.parse(res.text).products;
      });

      // Expect that we got the Zenbook Prime back
      assert.equal(results.length, 1);
      assert.equal(results[0]._id, PRODUCT_ID);
      assert.equal(results[0].name, 'Asus Zenbook Prime');
      done();
    });
  });
});
