(function () {
"use strict";

angular.module('BeherenAccountsApp')
.controller('GebruikersController', GebruikersController);

GebruikersController.$inject = ['gebruikers'];
function GebruikersController(gebruikers) {

  var $ctrl = this;
  $ctrl.gebruikers = gebruikers;
}
})();
