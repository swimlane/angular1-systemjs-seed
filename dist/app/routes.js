System.register(["angular", "src/common/utils/register"], function (_export) {
  "use strict";

  var angular, route, routes;
  return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }, function (_srcCommonUtilsRegister) {
      route = _srcCommonUtilsRegister.route;
    }],
    execute: function () {
      routes = _export("routes", function (module) {
        var $inject = ["$stateProvider"];
        var RouterConfig = function ($stateProvider) {
          $stateProvider.state("login", {
            url: "/login",
            templateUrl: "src/app/login/login.tpl.html",
            resolve: {
              async: function ($q) {
                var def = $q.defer();
                def.resolve(function () {});
                return def.promise;
              }
            }
          });
        };

        RouterConfig.$inject = $inject;

        return RouterConfig;
      });
    }
  };
});