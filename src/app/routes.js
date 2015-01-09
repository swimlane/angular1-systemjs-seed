import angular from 'angular';
import {route} from 'src/common/utils/register';

export var routes = function(module){

  var $inject = ['$stateProvider'];
  var RouterConfig = function ($stateProvider) {

    $stateProvider.state('login',{
        url: '/login',
        templateUrl: 'src/app/login/login.tpl.html',
        //controller: 'LoginController',
        resolve: {
          async: function($q){
            var def = $q.defer();
            def.resolve(function(){
              console.log('trying')
              System.import(src/app/login/login).then(loginModule => { 
                console.log('loaded')
                module.register(loginModule)
              });
              //import {loginModule} from 'src/app/login/login';
              //module.register(loginModule);
            })
            return def.promise;
          }
        }
    });

  };

  RouterConfig.$inject = $inject;

  return RouterConfig;
};
