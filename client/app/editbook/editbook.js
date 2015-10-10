'use strict';

angular.module('booktradingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/editbook/:id', {
        templateUrl: 'app/editbook/editbook.html',
        controller: 'EditbookCtrl'
      });
  });
