System.register(["angular", "angular-ui-router", "src/common/utils/register", "./routes"], function (_export) {
  "use strict";

  var angular, register, routes, module;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularUiRouter) {}, function (_srcCommonUtilsRegister) {
      register = _srcCommonUtilsRegister.register;
    }, function (_routes) {
      routes = _routes.routes;
    }],
    execute: function () {
      module = angular.module("swimlane", ["ui.router"]);


      module.config(register(module));
      module.config(routes(module));

      module.config(function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
        $locationProvider.html5Mode(true);
        $httpProvider.useApplyAsync(true);
      });


      module.run(function ($state) {
        console.log("main");
        $state.go("login");
      });

      angular.element(document).ready(function () {
        angular.bootstrap(document.querySelector("[data-main-app]"), [module.name], {});
      });
    }
  };
});