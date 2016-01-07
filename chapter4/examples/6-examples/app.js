var app = angular.module('myApp', ['ng']);

app.directive('userMenu', function() {
  return {
    controller: 'MyHttpController',
    template: '<div class="user" ng-show="user">' +
              '  Current User: {{user.profile.username}}' +
              '</div>' +
              '<div ng-show="!user">' +
              '  <a href="/auth/facebook">' +
              '    Log In' +
              '  </a>' +
              '</div>'
  }
});

app.controller('MyHttpController', function($scope, $http) {
  $http.get('/api/v1/me').success(function(data) {
    $scope.user = data.user;
  });
});
