'use strict';

angular.module('booktradingApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.awesomeThings = [];
    $scope.currentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    var getMyBooks = function() {
      if (Auth.isLoggedIn()) {
        $http.get('/api/books/' + Auth.getCurrentUser().name)
          .success(function(data) {
            $scope.books = data;
            socket.syncUpdates('book', $scope.books);
          })
          .error(function(data) {
            console.log('Error while retrieving data:');
            console.log(data);
          });
      } else {
        $scope.books = false;
      }
    };

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    getMyBooks();
  });
