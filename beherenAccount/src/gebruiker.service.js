(function () {
'use strict';

angular.module('BeherenAccountsApp')
.service('GebruikerService', GebruikerService);

GebruikerService.$inject = ['$http','$cookies']
function GebruikerService($http,$cookies) {

  var service = this;
  var login = null;

  service.whoami = function() {
    return login;
  };

  service.getGebruikers = function() {
    return $http({
        method: "GET",
        url: ("http://localhost:3000/account/gebruikers"),
        headers: {
          "Authorization":"Bearer " + login.token
        }
      }).then(function(p) {
        return p.data;
      }).catch(function(e) {
        throw mylib.toMessage(e);
      });
  };

  service.getGebruikerBijGebruikersnaam = function(gebruikersnaam) {
    return $http({
        method: "GET",
        url: ("http://localhost:3000/account/gebruikers?gebruikersnaam=" + gebruikersnaam)
      }).then(function(p) {
        return p.data;
      }).catch(function(e) {
        throw mylib.toMessage(e);
      });
  };

  service.authenticeren = function(gebruikersnaam,hash64) {
    return $http({
        method: "POST",
        url: ("http://localhost:3000/account/authenticeren"),
        headers: {
          "Content-type":"application/json"
        },
        data: {
          "gebruikersnaam":gebruikersnaam,
          "wachtwoord":hash64
        }
      }).then(function(p) {
        login = p.data;
        return p.data;
      }).catch(function(e) {
        login = null;
        throw mylib.toMessage(e);
      });
  };

  service.sso = function(token) {
    return $http({
        method: "POST",
        url: ("http://localhost:3000/account/authenticeren"),
        headers: {
          "Content-type":"application/json"
        },
        data: {
          "token":token
        }
      }).then(function(p) {
        console.log("sso success",token);
        login = p.data;
        return p.data;
      }).catch(function(e) {
        console.log("sso failure",token);
        login = null;
        throw mylib.toMessage(e);
      });
  };

  service.logout = function() {
    login = null;
    $cookies.put("nl.klaverblad.sso","reaper");
  }
};

})();
