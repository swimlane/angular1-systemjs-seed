System.register(["angular", "src/app/common/components/select"], function (_export) {
  "use strict";

  var angular, selectModule, loginModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_srcAppCommonComponentsSelect) {
      selectModule = _srcAppCommonComponentsSelect.selectModule;
    }],
    execute: function () {
      loginModule = _export("loginModule", angular.module("login", [selectModule.name]));


      loginModule.controller("LoginController", function ($scope) {
        console.log("logged");
        $scope.loggedin = false;
      });
    }
  };
});