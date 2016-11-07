(function () {
"use strict";

angular.module('BeherenAccountsApp')
.controller('GroepenController', GroepenController);

GroepenController.$inject = ['groepen','$scope'];
function GroepenController(groepen,$scope) {

  var $ctrl = this;
  $ctrl.groepen = groepen;

}
})();
