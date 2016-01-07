module.exports = function(config) {
  config.set({
    files: [
      'http://code.jquery.com/jquery-1.11.3.js',
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.0/angular.js',
      './directive.js',
      './test.js'
    ],
    frameworks: ['mocha', 'chai'],
    browsers: ['Chrome']
  });
};
