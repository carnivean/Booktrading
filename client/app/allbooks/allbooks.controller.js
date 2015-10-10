'use strict';

angular.module('booktradingApp')
  .controller('AllbooksCtrl', function ($scope, $http, Auth) {

    $scope.currentUser = Auth.getCurrentUser;

    var getBooks = function () {
      $http.get('/api/books').
        success(function(data) {
          $scope.books = data;
          socket.syncUpdates('book', $scope.books);
      }).error(function(data){
          console.log('Error in function getBooks: ' + data);
        });
    };
  });
