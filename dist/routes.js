System.register(["angular"], function (_export) {
  "use strict";

  var angular, routes;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      routes = _export("routes", angular.module("app.routes", []));


      routes.config(function ($stateProvider) {
        $stateProvider.state("login", {
          url: "/login",
          templateUrl: "app/login/login.tpl.html",
          controller: "LoginCtrl"
        });

        $stateProvider.state("forms", {
          url: "/forms",
          controller: "FormsCtrl"
        });

        $stateProvider.state("dashboard", {
          url: "/dashboard",
          controller: "DashboardCtrl"
        });

        $stateProvider.state("admin", {
          url: "/admin",
          controller: "AdminCtrl"
        });
      });
    }
  };
});