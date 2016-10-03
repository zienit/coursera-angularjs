(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


//MainShoppingListController.$inject = ['ShoppingListService'];
function CategoriesController() {
  var ctrl = this;
  ctrl.items = [{short_name:"x",name:"y"}];
  ctrl.pipo = "Hrenr Bezdemer";
}

})();
