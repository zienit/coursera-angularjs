(function() {
  'use strict'

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyListController', ToBuyListController)
  .controller('AlreadyBoughtListController', AlreadyBoughtListController)
  .service('ShoppingListService', ShoppingListService);

  ToBuyListController.$inject = ['ShoppingListService'];

  function ToBuyListController(ShoppingListService) {

    this.list = ShoppingListService.toBuy();
    this.buy = function(index) {
      ShoppingListService.buy(index);
    }
  }

  AlreadyBoughtListController.$inject = ['ShoppingListService'];

  function AlreadyBoughtListController(ShoppingListService) {

    this.list = ShoppingListService.bought();
  }

  function ShoppingListService() {

    this.toBuyList = [
      {name:"cookies",quantity:10},
      {name:"pie",quantity:5},
      {name:"nuts",quantity:100},
      {name:"apples",quantity:3},
      {name:"beer",quantity:2},
    ];

    this.boughtList = [];

    this.toBuy = function() {
      return this.toBuyList;
    }

    this.bought = function() {
      return this.boughtList;
    }

    this.buy = function(index) {
      this.boughtList.push(this.toBuyList[index]);
      this.toBuyList.splice(index,1);
    }
  }
})();
