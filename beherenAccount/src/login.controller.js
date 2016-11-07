(function () {
"use strict";

angular.module('BeherenAccountsApp')
.controller('LoginController', LoginController);

LoginController.$inject = ['GebruikerService','$state','$stateParams','$cookies','$rootScope'];
function LoginController(GebruikerService,$state,$stateParams,$cookies,$rootScope) {

  var $ctrl = this;

  $ctrl.gebruikersnaam = "admin";
  $ctrl.wachtwoord = "ad";

  $ctrl.submit = function () {

    GebruikerService.getGebruikerBijGebruikersnaam($ctrl.gebruikersnaam).then(function(g) {
      if (g.length === 1) {
        return g[0];
      } else {
        throw { message : "Onjuiste gebruikersnaam of wachtwoord" };
      }
    })
    .then(function(g) {
      return authenticeren(g);
    })
    .then(function(l) {
      $rootScope.$broadcast("login",l);
      $state.go($stateParams.savedState === null ? "home" : $stateParams.savedState.name,$stateParams.savedParams)
      .then(function(s) {
        $rootScope.$broadcast("success",{ message : l.melding });
      });
    })
    .catch(function(e) {
      $rootScope.$broadcast("error",e);
    });

    function authenticeren(gebruiker)
    {
      var hash = mylib.hash64(gebruiker.salt,$ctrl.wachtwoord);
      var login = GebruikerService.authenticeren($ctrl.gebruikersnaam,hash);
      return login.then(function(l) {
        if (l.status === "OK") {
          $cookies.put("nl.klaverblad.sso",l.token);
          return l;
        } else {
          throw { message : l.melding };
        }
      });
    }
  }
}

})();
