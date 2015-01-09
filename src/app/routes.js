import angular from 'angular';
import {route} from 'src/common/utils/register';
// import template from './site-header.template.html!text';

export var routes = function(module){

  var $inject = ['$stateProvider'];
  var RouterConfig = function ($stateProvider) {

    $stateProvider.state('login', {
      url: '/login',
      templateUrl: 'src/app/login/login.tpl.html',
      controller: 'LoginController',
      resolve:{
        load: route(module, 'src/app/login/login')
      }
    });

  };

  RouterConfig.$inject = $inject;

  return RouterConfig;
};
