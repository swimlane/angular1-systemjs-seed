System.register(["angular", "app/common/components/modal", "app/common/components/select"], function (_export) {
  "use strict";

  var angular, modalModule, selectModule, dashboardModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_appCommonComponentsModal) {
      modalModule = _appCommonComponentsModal["default"];
    }, function (_appCommonComponentsSelect) {
      selectModule = _appCommonComponentsSelect["default"];
    }],
    execute: function () {
      dashboardModule = _export("dashboardModule", angular.module("dashboard", [selectModule.name, modalModule.name]));


      loginModule.controller("DashboardCtrl", function ($scope) {
        console.log("dashboard!");
      });
    }
  };
});