'use strict';

angular.module('booktradingApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $http) {
    $scope.errors = {};

    var exists = false;

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.updateProfile = function() {
      var entry = $scope.profile;

      entry.username = Auth.getCurrentUser().name;
      if(exists) {
        $http.put('/api/profiles/' + $scope.profile._id, entry)
          .success(function(data){
            $scope.profileMessage = 'Successfully updated your profile.';
          })
          .error(function(data){
            $scope.profileMessage = 'Error while updating your profile.';
          });
      } else {
        $http.post('/api/profiles', entry)
          .success(function(data){

              $scope.profileMessage = 'Successfully updated your profile.';
          })
          .error(function(data){
            $scope.profileMessage = 'Error while updating your profile.';
          });
      }
    };

    $http.get('/api/profiles/' + Auth.getCurrentUser().name)
      .success(function(data){
        $scope.profile = data[0];
        if (data.length > 0) {
          exists = true;
        }
      })
      .error(function(data){
        $scope.profile = {};
      });
  });
