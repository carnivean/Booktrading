'use strict';

describe('Controller: EditbookCtrl', function () {

  // load the controller's module
  beforeEach(module('booktradingApp'));

  var EditbookCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditbookCtrl = $controller('EditbookCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
