import angular from 'angular';
import {route} from 'src/common/utils/register';
//import 'dist/app/login/login.tpl';

// import template from './site-header.template.html!text';
// http://stackoverflow.com/questions/21386651/angular-ui-router-getting-content-of-dynamic-template

export var routes = function(module){

  var $inject = ['$stateProvider'];
  var RouterConfig = function ($stateProvider) {

    $stateProvider.state('login', {
      url: '/login',
      //templateUrl: 'dist/app/login/login.tpl.html',
      templateUrl: 'src/app/login/login.tpl.html',
      /*templateProvider: function($q){
        var def = $q.defer();
        System.import(obj.src).then(loaded => {
          debugger;
          def.resolve(loaded)
        });
        return def.promise;
      },*/
      controller: 'LoginController',
      resolve:{
        load: route({ 
          parent: module, 
          src: 'src/app/login/login',
          name: 'loginModule'
        })
      }
    });

  };

  RouterConfig.$inject = $inject;

  return RouterConfig;
};
