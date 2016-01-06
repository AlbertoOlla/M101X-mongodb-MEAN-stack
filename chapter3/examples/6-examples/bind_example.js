var obj = { a: 1 };

var testWithP1 = test.bind(obj, 'first parameter');

testWithP1('second parameter');

function test(p1, p2) {
  console.log('This = ' + require('util').inspect(this));
  console.log('p1 = ' + p1);
  console.log('p2 = ' + p2);
}
