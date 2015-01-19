import angular from 'angular';
import futureRoutes from './routes.json!';

export var routes = function(module){

  var $inject = ['$stateProvider', '$futureStateProvider'];
  var RouterConfig = function ($stateProvider, $futureStateProvider) {

    $futureStateProvider.stateFactory('load', function($q, $ocLazyLoad, futureState){
      var def = $q.defer();

      System.import(futureState.src).then(loaded => {
        var newModule = loaded;
        if(!loaded.name){
          var key = Object.keys(loaded), 
          newModule = loaded[key[0]];
        }
        
        $ocLazyLoad.load(newModule);
        def.resolve(newModule);
      });

      return def.promise;
    });

    futureRoutes.forEach(function(r){
      $futureStateProvider.futureState(r);
    });
    
  };

  RouterConfig.$inject = $inject;

  return RouterConfig;
};
