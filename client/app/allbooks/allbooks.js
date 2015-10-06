'use strict';

angular.module('booktradingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/allbooks', {
        templateUrl: 'app/allbooks/allbooks.html',
        controller: 'AllbooksCtrl'
      });
  });
