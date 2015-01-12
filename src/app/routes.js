import angular from 'angular';

export var routes = function(module){

  var $inject = ['$stateProvider', '$futureStateProvider'];
  var RouterConfig = function ($stateProvider, $futureStateProvider) {

    $futureStateProvider.stateFactory('load', function($q, $ocLazyLoad, futureState){
      var def = $q.defer();

      System.import(futureState.src).then(loaded => {
        var key = Object.keys(loaded), newModule = loaded[key[0]];
        $ocLazyLoad.load(newModule)
        def.resolve(newModule);
      });

      return def.promise;
    });

    $futureStateProvider.futureState({
      'stateName': 'login',
      'urlPrefix': '/login',
      'type': 'load',
      'src': 'src/app/login/login'
    });

    $futureStateProvider.futureState({
      'stateName': 'dashboards',
      'urlPrefix': '/dashboards',
      'type': 'load',
      'src': 'src/app/dashboard/dashboard'
    });

  };

  RouterConfig.$inject = $inject;

  return RouterConfig;
};
