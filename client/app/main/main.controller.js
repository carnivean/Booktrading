'use strict';

angular.module('booktradingApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, $timeout, $location) {
    $scope.awesomeThings = [];
    $scope.currentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.page = 'booktable';

    var getMyBooks = function() {
      console.log('isLoggedIn(): ' + Auth.isLoggedIn());
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

    var getTrades = function() {
      if (Auth.isLoggedIn()) {
        $http.get('api/trades/' + Auth.getCurrentUser().name)
          .success(function(data) {
            $scope.trades = data;
            socket.syncUpdates('trade', $scope.trades);
          })
          .error(function(data) {
            console.log('Error while retrieving data:');
            console.log(data);
          });
      }
    };

    $scope.changePage = function(page) {
        $scope.page = page;
        $location.path('/');
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

    $timeout(getTrades, 1000);
    $timeout(getMyBooks, 1000);
  });
