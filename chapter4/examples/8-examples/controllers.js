exports.UserMenuController = function($scope, $user) {
  $scope.user = $user;

  setTimeout(function() {
    $scope.$emit('UserMenuController');
  }, 0);
};
