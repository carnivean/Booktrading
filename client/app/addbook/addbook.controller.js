'use strict';

angular.module('booktradingApp')
  .controller('AddbookCtrl', function ($scope, Auth, $http) {

    var resetInputFields = function() {
      $scope.title = '';
      $scope.author = '';
      $scope.success = false;
    };

    $scope.addBook = function () {
        var newEntry = {
          title: $scope.title,
          author: $scope.author,
          owner: Auth.getCurrentUser().name,
          isTraded: false,
          Trades: []
        };

        resetInputFields();

        $http.post('/api/books', newEntry)
          .success(function(data) {
              console.log('Successfully Posted!');
              console.log(data);
              $scope.success = true;
          })
          .error(function(data) {
              console.log('Error while posting the data: ' +  data);
          });
    };

    resetInputFields();
  });
