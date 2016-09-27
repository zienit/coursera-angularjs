(function() {
  'use strict'

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService) {

    var ctrl = this;

    ctrl.searchTerm = "";
    ctrl.nothingFound = false;

    ctrl.removeItem = function(index) {
      ctrl.found.splice(index,1);
    }

    ctrl.narrowItDownForMe = function() {

      if (!ctrl.searchTerm) {
        ctrl.nothingFound = true;
        ctrl.found = [];
        return;
      }

      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
      promise.then(function (response) {
        ctrl.found = response;
        ctrl.nothingFound = ctrl.found.length === 0;
      })
      .catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    }

  }

  MenuSearchService.$inject = ['$http']
  function MenuSearchService($http) {

    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {

      var response = $http({
          method: "GET",
          url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
        });
      return response
        .then(function (response) {
          var items = response.data.menu_items;
          var found = [];
          for (var i = 0; i < items.length; i++) {
            if (items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              found.push(items[i]);
            }
          }
          return found;
        });
    }
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: function() {},
      controllerAs: 'ctrl',
      bindToController: true
    };

    return ddo;
  }

  function FoundItemsDirectiveController() {
  //    var henri = this;
  //
  //    henri.soup = "souppppp";


  //
  //   list.cookiesInList = function () {
  //     for (var i = 0; i < list.items.length; i++) {
  //       var name = list.items[i].name;
  //       if (name.toLowerCase().indexOf("cookie") !== -1) {
  //         return true;
  //       }
  //     }
  //
  //     return false;
  //   };
  }

})();
