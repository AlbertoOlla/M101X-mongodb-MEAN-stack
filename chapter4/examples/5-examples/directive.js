var app = angular.module('myApp', ['ng']);

app.directive('counterDirective', function() {
  return {
    controller: 'MyController',
    template: '<div  ng-controller="MyController"' +
              '      ng-click="counter = counter + 1">' +
              'You\'ve clicked this div {{counter}} times' +
              '</div>'
  }
});

app.controller('MyController', function($scope) {
  $scope.counter = 0;
});
