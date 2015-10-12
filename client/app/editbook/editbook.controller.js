'use strict';

angular.module('booktradingApp')
  .controller('EditbookCtrl', function ($scope, $routeParams, Auth, $location, $http) {
    var id = $routeParams.id;
    $scope.success = false;

    var book;

    var getBookData = function() {
      $http.get('/api/books/' + id)
        .success(function(data) {
          if (Auth.getCurrentUser().name !== data.owner && !Auth.isAdmin()) {
            // if the current user isn't the owner of the book
            // or the Admin, he has no right to be here
            $location.path('/');
          } else {
            book = data;
            $scope.author = data.author;
            $scope.title = data.title;
          }
        })
        .error(function(data) {
          $location.path('/');
        });
    };

    $scope.updateBook = function () {
        book.author = $scope.author;
        book.title = $scope.title;
        $http.put('/api/books/' + id, book)
          .success(function(data) {
              $scope.success = true;
          })
          .error(function(data) {

          });
    };

    getBookData();
  });
