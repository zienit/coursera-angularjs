(function () {
"use strict";

angular.module('common')
.service('SignUpService', SignUpService);

function SignUpService() {
  var service = this;

  service.setMyInfo = function (user) {
    service.user = user;
  };

  service.getMyInfo = function() {
    return service.user;
  }
}
})();
