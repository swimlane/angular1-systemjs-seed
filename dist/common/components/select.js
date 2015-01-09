System.register(["angular"], function (_export) {
  "use strict";

  var angular, selectModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      selectModule = _export("selectModule", angular.module("common.components.select", []));
    }
  };
});