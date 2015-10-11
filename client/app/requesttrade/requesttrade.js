'use strict';

angular.module('booktradingApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/requesttrade/:owner/:id', {
        templateUrl: 'app/requesttrade/requesttrade.html',
        controller: 'RequesttradeCtrl'
      });
  });
