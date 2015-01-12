import angular from 'angular';
import {route} from 'src/common/utils/register';
//import 'dist/app/login/login.tpl';

// import template from './site-header.template.html!text';

export var routes = function(module){

  var $inject = ['$stateProvider', '$futureStateProvider'];
  var RouterConfig = function ($stateProvider, $futureStateProvider) {

    $futureStateProvider.stateFactory('load', function($q, futureState){
      var def = $q.defer();

      System.import(futureState.src).then(loaded => {
        var key = Object.keys(loaded), newModule = loaded[key[0]];
        module.register(newModule)
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

  };

  RouterConfig.$inject = $inject;

  return RouterConfig;
};
