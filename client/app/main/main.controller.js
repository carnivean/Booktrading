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

    var getMyBooks = function () {
      if (Auth.isLoggedIn()) {
        $http.get('/api/books/' + Auth.getCurrentUser().name)
          .success(function (data) {
            $scope.books = data;
            socket.syncUpdates('book', $scope.books);

            for (var ind = 0; ind < data.length; ind++) {
              $scope.tradeBook[data[ind]._id] = data[ind];
            }
          })
          .error(function (data) {

          });
      } else {
        $scope.books = false;
      }
    };

    var getTrades = function () {
      if (Auth.isLoggedIn()) {
        $http.get('api/trades/' + Auth.getCurrentUser().name)
          .success(function (data) {
            $scope.trades = data;

            for (var index = 0; index < data.length; index++) {
              $scope.tradeObj[data[index]._id] = data[index];

              if (!$scope.tradeBook.hasOwnProperty(data[index].book[0])) {
                $http.get('api/books/' + data[index].owner + '/' + data[index].book[0])
                  .success(function (book) {
                    $scope.tradeBook[book[0]._id] = book[0];
                  })
                  .error(function (data) {

                  });
              }
            }

            socket.syncUpdates('trade', $scope.trades);
          })
          .error(function (data) {

          });
      }
    };

    $scope.acceptTrade = function (tradeId) {
      var changedEntry = $scope.tradeObj[tradeId];
      changedEntry.status = 1;
      $http.put('/api/trades/' + tradeId, changedEntry)
        .success(function (data) {

          $location.path('/');
        })
        .error(function (data) {

        });
    };

    $scope.rejectEndTrade = function (tradeId) {
      if ($scope.tradeBook[tradeId].owner === Auth.getCurrentUser().name) {
        $scope.acceptTrade(tradeId);
      }
    };

    $scope.denyTrade = function (tradeId) {
      $http.delete('/api/trades/' + tradeId)
        .success(function () {
          $location.path('/');
        })
        .error(function (data) {

        });
    };

    $scope.requestTradeFinish = function (tradeId) {
      var changedEntry = $scope.tradeObj[tradeId];
      changedEntry.status = 2;
      $http.put('/api/trades/' + tradeId, changedEntry)
        .success(function (data) {

          $location.path('/');
        })
        .error(function (data) {

        });
    };

    $scope.finishTrade = function (tradeId) {

      $scope.finishTradeDirectly(tradeId);
    };

    $scope.finishTradeDirectly = function (tradeId) {
      // this is probably unsafe, as the user has access to the scope
      // and he can change the owner, we should do the check server side or
      // at least get the data fresh from the server before comparing it

      if ($scope.tradeObj[tradeId].owner === Auth.getCurrentUser().name) {
        $scope.denyTrade(tradeId);
      }
    };

    $scope.changePage = function (page) {
      $scope.page = page;
      $location.path('/');
    };

    $scope.addThing = function () {
      if ($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', {name: $scope.newThing});
      $scope.newThing = '';
    };

    $scope.deleteThing = function (thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $timeout(getTrades, 1000);
    $timeout(getMyBooks, 1000);
  });
