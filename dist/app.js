System.register(["angular", "angular-ui-router", "app/routes"], function (_export) {
  "use strict";

  var angular, routes, module;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_angularUiRouter) {}, function (_appRoutes) {
      routes = _appRoutes.routes;
    }],
    execute: function () {
      module = angular.module("swimlane", ["ui.router", routes.name]);


      module.config(function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
        $locationProvider.html5Mode(true);
        $httpProvider.useApplyAsync(true);
      });

      module.run(function ($state) {
        console.log("main");
      });

      angular.element(document).ready(function () {
        angular.bootstrap(document.querySelector("[data-main-app]"), [module.name], {});
      });
    }
  };
});