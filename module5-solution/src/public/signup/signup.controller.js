(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$state','$scope','MenuService','SignUpService','user'];
function SignUpController($state,$scope,MenuService,SignUpService,user) {

  var $ctrl = this;

  $ctrl.user = user;
  
  $ctrl.submit = function () {
    console.log($ctrl.user.favorite);
    MenuService.getMenuItem($ctrl.user.favorite)
      .then(function(data) {
        console.log("data",data);
        SignUpService.setMyInfo($ctrl.user);
//        $scope.regForm.favorite.$setValidity("code",true);
        $state.go('public.myinfo');
      }).catch(function(y) {
        console.log("error",y);
        $scope.regForm.favorite.$setValidity("code",false);
      })
  };

  $ctrl.changeFavorite = function() {
    $scope.regForm.favorite.$setValidity("code",true);
  }
}

})();
