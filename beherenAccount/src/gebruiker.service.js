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
        return login;
      }).catch(function(e) {
        login = null;
        throw mylib.toMessage(e);
      });
  };

  service.salt = function() {
    return $http({
        method: "POST",
        url: ("account/salt"),
      }).then(function(p) {
        return p.data;
      }).catch(function(e) {
        throw mylib.toMessage(e);
      });
  }

  service.toevoegen = function(gebruiker) {
    return $http({
        method: "POST",
        url: ("http://localhost:3000/account/gebruikers"),
        headers: {
          "Content-type":"application/json",
          "Authorization":"Bearer " + login.token
        },
        data: gebruiker
      }).then(function(p) {
        var id = p.headers("location");
        return id
      }).catch(function(e) {
        throw mylib.toMessage(e);
      });
  }

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
        login = p.data;
        return p.data;
      }).catch(function(e) {
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
