(function () {
"use strict";

angular.module('BeherenAccountsApp')
.controller('GroepenController', GroepenController);

GroepenController.$inject = ['groepen'];
function GroepenController(groepen) {

  var $ctrl = this;
  $ctrl.groepen = groepen;
}
})();
