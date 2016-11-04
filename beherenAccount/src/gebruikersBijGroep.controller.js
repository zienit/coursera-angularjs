(function () {
"use strict";

angular.module('BeherenAccountsApp')
.controller('GebruikersBijGroepController', GebruikersBijGroepController);

GebruikersBijGroepController.$inject = ['gebruikers'];
function GebruikersBijGroepController(gebruikers) {

  var $ctrl = this;
  $ctrl.gebruikers = gebruikers;
}
})();
