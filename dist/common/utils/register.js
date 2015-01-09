System.register(["angular"], function (_export) {
  "use strict";

  var angular;
  _export("route", route);

  _export("register", register);

  function route(entry, resolve) {
    console.log(entry);
    return {
      url: "/" + entry,
      templateUrl: "src/app/" + entry + "/" + entry + ".tpl.html",
      controller: entry + "Controller",
      resolve: {
        async: ["$q", function ($q) {
          console.log("async");
          var defer = $q.defer();
          resolve(defer.resolve);
          return defer.promise;
        }]
      }
    };
  }

  function register(app) {
    var $inject = ["$controllerProvider", "$provide", "$compileProvider", "$filterProvider"];

    var RegisterConfig = function ($controllerProvider, $provide, $compileProvider, $filterProvider) {
      var providers = {
        $controllerProvider: $controllerProvider,
        $provide: $provide,
        $compileProvider: $compileProvider,
        $filterProvider: $filterProvider
      };

      app.register = function (module) {
        module.requires.forEach(function (moduleName) {
          app.register(angular.module(moduleName));
        });

        module._invokeQueue.reverse().forEach(function (invokeArgs) {
          var provider = providers[invokeArgs[0]];
          provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
        });

        return this;
      };
    };

    RegisterConfig.$inject = $inject;

    return RegisterConfig;
  }return {
    setters: [function (_angular) {
      angular = _angular["default"];
    }],
    execute: function () {
      ;
    }
  };
});