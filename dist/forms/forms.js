System.register(["angular", "app/common/components/select"], function (_export) {
  "use strict";

  var angular, selectModule, loginModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_appCommonComponentsSelect) {
      selectModule = _appCommonComponentsSelect["default"];
    }],
    execute: function () {
      loginModule = _export("loginModule", angular.module("forms", [selectModule.name]));


      loginModule.controller("FormsCtrl", function ($scope) {
        console.log("forms!");
      });
    }
  };
});