System.register(["angular", "src/app/common/components/modal"], function (_export) {
  "use strict";

  var angular, modalModule, adminModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_srcAppCommonComponentsModal) {
      modalModule = _srcAppCommonComponentsModal["default"];
    }],
    execute: function () {
      adminModule = _export("adminModule", angular.module("admin", [modalModule.name]));


      loginModule.controller("AdminCtrl", function ($scope) {
        console.log("admin!");
      });
    }
  };
});