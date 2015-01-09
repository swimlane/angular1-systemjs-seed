System.register(["angular", "app/common/components/select"], function (_export) {
  "use strict";

  var angular, selectModule, loginModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_appCommonComponentsSelect) {
      selectModule = _appCommonComponentsSelect.selectModule;
    }],
    execute: function () {
      loginModule = _export("loginModule", angular.module("login", [selectModule.name]));


      loginModule.controller("LoginCtrl", function ($scope) {
        $scope.loggedin = false;
      });
    }
  };
});