import angular from 'angular';

export function register(app){
  var $inject = ['$controllerProvider', '$provide', '$compileProvider', '$filterProvider', '$animateProvider', '$injector'];

  var RegisterConfig = function ($controllerProvider, $provide, $compileProvider, $filterProvider, $animateProvider, $injector) {
    var providers = {
      $controllerProvider: $controllerProvider,
      $provide: $provide,
      $compileProvider: $compileProvider,
      $filterProvider: $filterProvider,
      $injector: $injector,
      $animateProvider: $animateProvider
    };

    app.register = function (module) {
      module.requires.forEach(function (moduleName) {
        app.register(angular.module(moduleName));
      });

      module._invokeQueue.reverse().forEach(function (invokeArgs) {
        var provider = providers[invokeArgs[0]];
        provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
      });

      module._configBlocks.reverse().forEach(function (invokeArgs) {
        var provider = providers[invokeArgs[0]];
        provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
      });

      //var instanceInjector = angular.injector();
      //angular.forEach(module._runBlocks, function(fn) {
      //  instanceInjector.invoke(fn);
      //});

      return this;
    };
  };

  RegisterConfig.$inject = $inject;

  return RegisterConfig;
};
