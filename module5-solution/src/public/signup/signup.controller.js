(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$state'];
function SignUpController($state) {
  var $ctrl = this;

  $ctrl.submit = function () {
    console.log($ctrl.user.firstname);
    $state.go('public.myinfo');
  };
}

})();
