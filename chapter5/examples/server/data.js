var express = require('express');
var fs = require('fs');
var wagner = require('wagner-core');

require('./models')(wagner);
require('./dependencies')(wagner);

wagner.invoke(function(Product) {
  var products = [];
  /*products = [
    {
      name: 'Leadership and Self-Deception: Getting Out of the Box',
      pictures: ['http://i.imgur.com/IRTxQet.png'],
      price: {
        amount: 11.34,
        currency: 'USD'
      },
      category: {
        _id: 'Leadership',
        parent: 'Non-Fiction',
        ancestors: ['Books', 'Non-Fiction']
      }
    },
    {
      name: 'Professional AngularJS',
      pictures: ['http://i.imgur.com/1ltldCT.png'],
      price: {
        amount: 32.00,
        currency: 'USD'
      },
      category: {
        _id: 'Web Programming',
        parent: 'Non-Fiction',
        ancestors: ['Books', 'Non-Fiction', 'Web Programming']
      }
    }
  ];*/

  var phonesData = JSON.parse(fs.readFileSync('/home/val/Downloads/asus_tablets.json'));
  for (var i = 0; i < phonesData.count; ++i) {
    if (!phonesData.results.collection1[i].property1.text) {
      continue;
    }
    console.log(phonesData.results.collection1[i].property1.text);
    products.push({
      name: phonesData.results.collection1[i].property1.text,
      pictures: [phonesData.results.collection1[i].property2.src],
      price: {
        amount: phonesData.results.collection1[i].property3.substring(1, phonesData.results.collection1[i].property3.indexOf('.')),
        currency: 'GBP'
      },
      category: {
        _id: 'Tablets',
        parent: 'Electronics',
        ancestors: ['Electronics', 'Tablets']
      }
    });
  }

  phonesData = JSON.parse(fs.readFileSync('/home/val/Downloads/google_phones.json'));

  var E = require('events').EventEmitter;
  var ee = new E();
  var imgur = require('imgur');
  var remaining = phonesData.collection1.length;

  for (var i = 0; i < phonesData.collection1.length; ++i) {
    console.log(phonesData.collection1[i].property1.text);
    (function(i) {
      imgur.uploadBase64(phonesData.collection1[i].property2.replace('https://www.google.com/data:image/jpeg;base64,', '')).
        then(function(json) {
          products.push({
            name: phonesData.collection1[i].property1.text,
            pictures: [json.data.link],
            price: {
              amount: phonesData.collection1[i].property3.substring(1, phonesData.collection1[i].property3.indexOf('.')),
              currency: 'USD'
            },
            category: {
              _id: 'Phones',
              parent: 'Electronics',
              ancestors: ['Electronics', 'Phones']
            }
          });

          if (--remaining === 0) {
            ee.emit('done');
          }
        }).
        catch(function(err) {
          console.log('Error: ' + err);
          process.exit(1);
        });
    })(i);
  }

  /*var booksData = JSON.parse(fs.readFileSync('/home/val/Downloads/stand_international_cookbooks.json'));
  for (var i = 0; i < booksData.count; ++i) {
    console.log(booksData.results.collection1[i].property1.text);
    products.push({
      name: booksData.results.collection1[i].property1.text,
      pictures: [booksData.results.collection1[i].property2.src],
      price: {
        amount: booksData.results.collection1[i].property3.substring(1, booksData.results.collection1[i].property3.indexOf('.')),
        currency: 'USD'
      },
      category: {
        _id: 'Cookbooks',
        parent: 'Non-Fiction',
        ancestors: ['Books', 'Non-Fiction', 'Cookbooks']
      }
    });
  }

  booksData = JSON.parse(fs.readFileSync('/home/val/Downloads/strand_most_popular.json'));
  for (var i = 1; i < booksData.count; ++i) {
    console.log(booksData.results.collection1[i].property3.text);
    products.push({
      name: booksData.results.collection1[i].property3.text,
      pictures: [booksData.results.collection1[i].property4.src],
      price: {
        amount: booksData.results.collection1[i].property5.substring(1, booksData.results.collection1[i].property5.indexOf('.')),
        currency: 'USD'
      },
      category: {
        _id: 'Classics',
        parent: 'Fiction',
        ancestors: ['Books', 'Fiction', 'Classics']
      }
    });
  }

  var laptopData = JSON.parse(fs.readFileSync('/home/val/Downloads/xoticpc_gaming_laptop.json'));
  for (var i = 0; i < 120; ++i) {
    console.log(laptopData.results.collection1[i].property1.text);
    products.push({
      name: laptopData.results.collection1[i].property1.text,
      pictures: [laptopData.results.collection2[i].property2.src],
      price: {
        amount: laptopData.results.collection3[i].property3.substring(1, laptopData.results.collection3[i].property3.indexOf('.')),
        currency: 'USD'
      },
      category: {
        _id: 'Laptops',
        parent: 'Electronics',
        ancestors: ['Electronics', 'Laptops']
      }
    });
  }*/

  ee.on('done', function() {
    Product.create(products, function(error, products) {
      console.log('Error: ' + error);
      process.exit(0);
    });
  });
});
