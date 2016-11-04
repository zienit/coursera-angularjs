(function () {
'use strict';

angular.module('BeherenAccountsApp')
.service('GroepService', GroepService);

GroepService.$inject = ['$http','GebruikerService']
function GroepService($http,GebruikerService) {

  var service = this;

  service.getGroepen = function() {
    var login = GebruikerService.whoami();
    return $http({
        method: "GET",
        url: ("account/groepen"),
        headers: {
          "Authorization":"Bearer " + login.token
        }
      }).then(function(p) {
        return p.data;
      }).catch(function(e) {
        login = null;
        throw mylib.toMessage(e);
      });
  };

  service.getGebruikersBijGroep = function(groep) {
    var login = GebruikerService.whoami();
    return $http({
        method: "GET",
        url: ("http://localhost:3000/account/groepen/" + groep + "/gebruikers"),
        headers: {
          "Authorization":"Bearer " + login.token
        }
      }).then(function(p) {
        login = p.data;
        return p.data;
      }).catch(function(e) {
        login = null;
        throw mylib.toMessage(e);
      });
  };

};

})();
