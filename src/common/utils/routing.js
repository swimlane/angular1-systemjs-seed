import angular from 'angular';
import futureRoutes from 'app/routes.json!';
import {futureStateModule} from './lazy-routes';

export var routing = function(module){

  module.requires.push(futureStateModule.name);
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
        
        $ocLazyLoad.load(newModule).then(function(){
          def.resolve(newModule);
        });
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
