(function() {
  'use strict'

  angular.module('LunchCheck',[])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {

    $scope.checkIfTooMuch = function() {
      $scope.message = checkLunchMenu($scope.lunchMenu);
    };
  }

  function checkLunchMenu(lunchMenu) {

    if (!lunchMenu) {
      return "Please enter data first";
    }
    var items = lunchMenu.split(',').length;
    return items <= 3 ? "Enjoy!" : "Too much!";
  }
})();
