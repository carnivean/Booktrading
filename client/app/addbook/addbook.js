'use strict';

angular.module('booktradingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/addbook', {
        templateUrl: 'app/addbook/addbook.html',
        controller: 'AddbookCtrl'
      });
  });
