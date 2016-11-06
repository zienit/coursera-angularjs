(function () {
"use strict";

angular.module('BeherenAccountsApp')
.controller('MainController', MainController);

MainController.$inject = ['$scope'];
function MainController($scope) {

  var $ctrl = this;
  $ctrl.error = "";
  $ctrl.success = "";
  $ctrl.login = null;

  var unregisterError = $scope.$on("error",function(event,error) {
    $ctrl.success = "";
    $ctrl.error = error.message;
  });

  var unregisterSuccess = $scope.$on("success",function(event,success) {
    console.log(success);
    $ctrl.error = "";
    $ctrl.success = success.message;
  });

  var unregisterLogin = $scope.$on("login",function(event,login) {
    $ctrl.login = login;
  });

  $ctrl.$onDestroy = function() {
    unregisterError();
    unregisterSuccess();
    unregisterLogin();
  }

}
})();
