'use strict';

angular.module('booktradingApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth, $timeout, $location) {
    $scope.awesomeThings = [];
    $scope.currentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.page = 'booktable';
    $scope.tradeBook = {};
    $scope.tradeObj = {};
    $scope.profiles = {};

    var getMyBooks = function() {
      console.log('isLoggedIn(): ' + Auth.isLoggedIn());
      if (Auth.isLoggedIn()) {
        $http.get('/api/books/' + Auth.getCurrentUser().name)
          .success(function(data) {
            $scope.books = data;
            socket.syncUpdates('book', $scope.books);

            for (var ind = 0; ind < data.length; ind++) {
              $scope.tradeBook[data[ind]._id] = data[ind];
            }
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

            for (var index = 0; index < data.length; index++) {
              $scope.tradeObj[data[index]._id] = data[index];

              if (!$scope.tradeBook.hasOwnProperty(data[index].book[0])) {
                $http.get('api/books/' + data[index].owner + '/' + data[index].book[0])
                  .success(function(book) {
                    $scope.tradeBook[book[0]._id] = book[0];
                  })
                  .error(function(data) {
                    console.log('Error while retrieving data:');
                    console.log(data);
                  });
              }
            }

            socket.syncUpdates('trade', $scope.trades);
          })
          .error(function(data) {
            console.log('Error while retrieving data:');
            console.log(data);
          });
      }
    };

    var getProfile = function(user) {
        $http.get('api/profiles/' + user)
          .success(function(data){
            $scope.profiles[data[0].username] = data[0];
          })
          .error(function(data){
            console.log('Error while retrieving data:');
            console.log(data);
          });
    };

    $scope.acceptTrade = function(tradeId) {
      var changedEntry = $scope.tradeObj[tradeId];
      changedEntry.status = 1;
      $http.put('/api/trades/' + tradeId, changedEntry)
        .success(function(data) {
            console.log('Successfully updated the trade');
            console.log(data);
            $location.path('/');
        })
        .error(function(data) {
          console.log('Error while patching the trade: ');
          console.log(data);
        });
    };

    $scope.denyTrade = function(tradeId) {
        $http.delete('/api/trades/' + tradeId)
          .success(function() {
            console.log('Successfully deleted the trade');
            $location.path('/');
          })
          .error(function(data){
            console.log('Error while deleting the trade: ');
            console.log(data);
          });
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
