(function () {
"use strict";

angular.module('BeherenAccountsApp')
.controller('LoginController', LoginController);

LoginController.$inject = ['GebruikerService','$state','$stateParams','$cookies'];
function LoginController(GebruikerService,$state,$stateParams,$cookies) {

  var $ctrl = this;

  $ctrl.gebruikersnaam = "admin";
  $ctrl.wachtwoord = "ad";

  $ctrl.submit = function () {

    GebruikerService.getGebruikerBijGebruikersnaam($ctrl.gebruikersnaam).then(function(g) {
      if (g.length === 1) {
        authenticeren(g[0]);
      } else {
        $ctrl.melding = "Onjuiste gebruikersnaam of wachtwoord";
      }
    }).catch(function(e) {
      $ctrl.melding = e.message;
    });

    function authenticeren(gebruiker)
    {
      var hash = hash64(gebruiker.salt,$ctrl.wachtwoord);
      var login = GebruikerService.authenticeren($ctrl.gebruikersnaam,hash);
      login.then(function(l) {
        if (l.status === "OK") {
          $cookies.put("nl.klaverblad.sso",l.token);
          $state.go($stateParams.savedState === null ? "home" : $stateParams.savedState.name,$stateParams.savedParams);
        } else {
          $ctrl.melding = l.melding;
        }
      }).catch(function(e) {
        $ctrl.melding = e.message;
      });
    }
  }
}

function hash64(salt64,cleartext) {

  var wachtwoordBits = sjcl.codec.utf8String.toBits(cleartext);
  var saltBits = sjcl.codec.base64.toBits(salt64);
  return sjcl.codec.base64.fromBits(
    sjcl.hash.sha256.hash(
      sjcl.bitArray.concat(saltBits,wachtwoordBits)
    )
  )
}
})();
