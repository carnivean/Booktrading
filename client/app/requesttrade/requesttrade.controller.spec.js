'use strict';

describe('Controller: RequesttradeCtrl', function () {

  // load the controller's module
  beforeEach(module('booktradingApp'));

  var RequesttradeCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RequesttradeCtrl = $controller('RequesttradeCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
