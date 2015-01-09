System.register(["angular", "app/common/components/modal"], function (_export) {
  "use strict";

  var angular, modalModule, adminModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_appCommonComponentsModal) {
      modalModule = _appCommonComponentsModal["default"];
    }],
    execute: function () {
      adminModule = _export("adminModule", angular.module("dashboard", [modalModule.name]));


      loginModule.controller("AdminCtrl", function ($scope) {
        console.log("admin!");
      });
    }
  };
});