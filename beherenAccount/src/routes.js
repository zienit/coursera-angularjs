(function () {

angular.module('BeherenAccountsApp')
.config(RoutesConfig)
.run(['$rootScope','$state','$cookies','GebruikerService',function($rootScope,$state,$cookies,GebruikerService) {

  $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error) {
      console.log(error);
      event.preventDefault();
      $state.go("error");
    }
  );

  $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options) {
      var whoami = GebruikerService.whoami();
      if (!whoami && toState.name.startsWith("private.")) {
        var sso = $cookies.get("nl.klaverblad.sso");
        event.preventDefault();
        if (sso) {
          var login = GebruikerService.sso(sso);
          login.then(function(l) {
            if (l.status === "OK") {
              $rootScope.$broadcast("login",l);
              $state.go(toState.name,toParams);
            } else {
              redirect();
            }
          })
          .catch(function(e){
            console.log(e);
            redirect();
          });
        } else {
          redirect();
        }
      }

      function redirect() {
        console.log("redirect to login",toState.name);
        $state.go("login",{
          savedState: toState,
          savedParams: toParams
        });
      }
    }
  );
}]);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      template: '<div class="jumbotron"><h1>Hello, world!</h1><p>...</p><p><a class="btn btn-primary btn-lg" ui-sref="login" role="button">Learn more</a></p></div>'
    })

    .state('error', {
      url: '/error',
      template: '<h2>Oops, something went wrong</h2>'
    })

    .state('login', {
      url: '/login',
      params: { savedState: null, savedParams: null },
      templateUrl: 'src/login.html',
      controller: 'LoginController as ctrl'
    })

    .state('logout',{
      url: '/logout',
      template: "<h2>u bent uitgelogd.</h2>",
      controller: ['GebruikerService','$rootScope',function(GebruikerService,$rootScope) {
        GebruikerService.logout();
        $rootScope.$broadcast("login",null);
      }]
    })

    .state('private',{
      abstract: true,
      template: '<ui-view/>',
    })

    .state('private.gebruikers', {
      url: '/gebruikers',
      templateUrl: 'src/gebruikers.html',
      controller: 'GebruikersController as ctrl',
      resolve: {
        gebruikers: ['GebruikerService', function (GebruikerService) {
          return GebruikerService.getGebruikers();
        }]
      }
    })

    .state('private.gebruiker', {
      url: '/gebruikers/{gebruiker}',
      templateUrl: 'src/gebruiker.html',
      controller: 'GebruikerController as ctrl',
      // resolve: {
      //   gebruikers: ['GebruikerService', function (GebruikerService) {
      //     return GebruikerService.getGebruikers();
      //   }]
      // }
    })

    .state('private.groepen', {
      url: '/groepen',
      templateUrl: 'src/groepen.html',
      controller: 'GroepenController as ctrl',
      resolve: {
        groepen: ['GroepService', function (GroepService) {
          return GroepService.getGroepen();
        }]
      }
    })

    .state('private.gebruikersBijGroep', {
      url: '/groepen/{groep}/gebruikers',
      templateUrl: 'src/gebruikersBijGroep.html',
      controller: 'GebruikersBijGroepController as ctrl',
      resolve: {
        gebruikers: ['GroepService','$stateParams', function (GroepService,$stateParams) {
          return GroepService.getGebruikersBijGroep($stateParams.groep);
        }]
      }
    });

}
})();
