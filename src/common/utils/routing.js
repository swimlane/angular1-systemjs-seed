import angular from 'angular';
import futureRoutes from 'app/routes.json!';
import 'ui-router-extras';

export default function(module){
  module.requires.push('ct.ui.router.extras.future');

  let RouterConfig = ['$stateProvider', '$futureStateProvider', function ($stateProvider, $futureStateProvider) {
    $futureStateProvider.stateFactory('load', ['$q', '$ocLazyLoad', 'futureState',
      function($q, $ocLazyLoad, futureState){

      let def = $q.defer();

      System.import(futureState.src).then(function(loaded){
        let newModule = loaded;
        if(!loaded.name){
          newModule = loaded.default;
        }

        $ocLazyLoad.load(newModule).then(function(){
          def.resolve();
        }, function(err) {
          throw err;
        });
      });

      return def.promise;
    }]);

    futureRoutes.forEach(function(r){
      $futureStateProvider.futureState(r);
    });
  }];

  return RouterConfig;
};
