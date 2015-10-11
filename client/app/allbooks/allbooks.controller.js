'use strict';

angular.module('booktradingApp')
  .controller('AllbooksCtrl', function ($scope, $http, Auth, socket) {

    $scope.currentUser = Auth.getCurrentUser;

    $scope.profiles = {};

    var dummyProfile = {
      city: '',
      state: '',
      name: '',
      username: ''
    };

    var getBooks = function () {
      $http.get('/api/books').
        success(function(data) {
          $scope.books = data;

          for (var index = 0; index < data.length; index++) {
            $scope.profiles[data[index].owner] = dummyProfile;
            getProfile(data[index].owner);
          }

          socket.syncUpdates('book', $scope.books);
      }).error(function(data){
          console.log('Error in function getBooks: ' + data);
        });
    };

    var getProfile = function(user) {
      $http.get('api/profiles/' + user)
        .success(function(data){
          if(data.length > 0) {
            $scope.profiles[data[0].username] = data[0];
          }

        })
        .error(function(data){
          console.log('Error while retrieving data:');
          console.log(data);
        });
    };

    getBooks();
  });
