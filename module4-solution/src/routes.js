(function () {

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  // Set up UI states
  $stateProvider
    .state('home', {
      url: '/',
      template: '<h2>Welcome to our Restaurant</h2><a ui-sref="categories">list of categories</a>'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/categories.html',
      controller: 'CategoriesController as ctrl'
    });
}


})();
