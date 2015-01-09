import angular from 'angular';
import 'angular-ui-router';
import {register} from 'src/common/utils/register';
import {routes} from './routes';

var module = angular.module('swimlane', ['ui.router']);

module.config(register(module));
module.config(routes(module));

module.config(function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
  //$locationProvider.html5Mode(true);
  $httpProvider.useApplyAsync(true);
});

module.run(function($state){
  console.log('main')
  $state.go('login');
});

angular.element(document).ready(function() {
	angular.bootstrap(document.querySelector('[data-main-app]'), [ module.name ], {
		// strictDi: true // turning off for now
	});
});
