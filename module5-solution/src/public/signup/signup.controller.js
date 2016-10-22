(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$state','$scope','MenuService','SignUpService','user'];
function SignUpController($state,$scope,MenuService,SignUpService,user) {

  var $ctrl = this;

  $ctrl.user = user;
  $ctrl.saved = false;

  $ctrl.submit = function () {
    MenuService.getMenuItem($ctrl.user.favorite)
      .then(function(data) {
        $ctrl.user.data = data;
        SignUpService.setMyInfo($ctrl.user);
        $ctrl.saved = true;
      }).catch(function(y) {
        $scope.regForm.favorite.$setValidity("code",false);
      })
  };

  $ctrl.changeFavorite = function() {
    $scope.regForm.favorite.$setValidity("code",true);
  }
}

})();
