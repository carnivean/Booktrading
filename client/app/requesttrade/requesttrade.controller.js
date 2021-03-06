'use strict';

angular.module('booktradingApp')
  .controller('RequesttradeCtrl', function ($scope, $routeParams, Auth, $http, $location) {
    $scope.owner = $routeParams.owner;
    $scope.id = $routeParams.id;

    // Prevent borrowing from himself
    // instead redirect to the editpage of the book
    if (Auth.getCurrentUser().name === $routeParams.owner) {
      $location.path('/editbook/' + Auth.getCurrentUser().name + '/' + $routeParams.id);
    }

    var book;

    $scope.currentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $http.get('api/books/' + $routeParams.owner + '/' + $routeParams.id)
      .success(function(data) {
          book = data[0];
          $scope.title = data[0].title;
          $scope.author = data[0].author;
          $scope.owner = data[0].owner;
          $scope.isTraded = data[0].isTraded;

      })
      .error(function(data) {

      });

    $scope.requestTrade = function() {
        var newEntry = {
          owner: $routeParams.owner,
          trader: Auth.getCurrentUser().name,
          status: 0,
          book: [book._id]
        };

        $http.post('/api/trades', newEntry)
          .success(function(data) {

            $location.path('/');
          })
          .error(function(data) {

          });
    };
  });
