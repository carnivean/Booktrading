'use strict';

angular.module('booktradingApp')
  .controller('RequesttradeCtrl', function ($scope, $routeParams, Auth) {
    $scope.owner = $routeParams.owner;
    $scope.id = $routeParams.id;

    // Prevent borrowing from himself
    if (Auth.getCurrentUser().name === $routeParams.owner) {
      $location.path('/');
    }

    $scope.currentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $http.get('api/books/' + $routeParams.id)
      .success(function(data) {
          $scope.title = data.title;
          $scope.author = data.author;
      })
      .error(function(data) {
          console.log('Error while retrieving data: ');
          console.log(data);
      });
  });
