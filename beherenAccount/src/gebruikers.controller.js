(function () {
"use strict";

angular.module('BeherenAccountsApp')
.controller('GebruikersController', GebruikersController);

GebruikersController.$inject = ['gebruikers','$scope'];
function GebruikersController(gebruikers,$scope) {

  var $ctrl = this;
  $ctrl.gebruikers = gebruikers;
}
})();
