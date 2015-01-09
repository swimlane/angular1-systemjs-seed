System.register(["angular", "src/app/common/components/modal", "src/app/common/components/select"], function (_export) {
  "use strict";

  var angular, modalModule, selectModule, dashboardModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_srcAppCommonComponentsModal) {
      modalModule = _srcAppCommonComponentsModal["default"];
    }, function (_srcAppCommonComponentsSelect) {
      selectModule = _srcAppCommonComponentsSelect["default"];
    }],
    execute: function () {
      dashboardModule = _export("dashboardModule", angular.module("dashboard", [selectModule.name, modalModule.name]));


      loginModule.controller("DashboardCtrl", function ($scope) {
        console.log("dashboard!");
      });
    }
  };
});