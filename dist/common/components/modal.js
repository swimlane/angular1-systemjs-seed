System.register(["angular"], function (_export) {
  "use strict";

  var angular, modalModule;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      modalModule = _export("modalModule", angular.module("common.components.modal", []));
    }
  };
});