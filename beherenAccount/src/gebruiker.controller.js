(function () {
"use strict";

angular.module('BeherenAccountsApp')
.controller('GebruikerController', GebruikerController);

GebruikerController.$inject = ['GebruikerService'];
function GebruikerController(GebruikerService) {

  var $ctrl = this;

  $ctrl.voornaam = "Henri";
  $ctrl.achternaam = "Bezemer";
  $ctrl.gebruikersnaam = "bezemerh";
  $ctrl.pki = "hbz";
  $ctrl.wachtwoord = "Klaver01";
  $ctrl.wachtwoord2 = "Klaver01";

  $ctrl.submit = function() {

    var gebruiker = {
        voornaam: $ctrl.voornaam,
        achternaam: $ctrl.achternaam,
        pki: $ctrl.pki,
        gebruikersnaam: $ctrl.gebruikersnaam
    };
    console.log(gebruiker);
    var salt = GebruikerService.salt();
    salt
      .then(function(s) {
        console.log(s);
        gebruiker.salt = s;
        gebruiker.wachtwoord = mylib.hash64(s,$ctrl.wachtwoord);
        return GebruikerService.toevoegen(gebruiker);
      })
      .then(function(id) {
        console.log(id);
      });
  }
}
})();
