(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/categories.template.html',
  bindings: {
    items: '<'
  },
  controller: function() {},
  controllerAs: 'ctrl',
  bindToController: true
});
})();
