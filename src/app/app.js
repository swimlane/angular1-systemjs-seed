import angular from 'angular';
import 'angular-ui-router';
import 'ocLazyLoad';
import {futureStateModule} from 'common/utils/lazy-routes';
import {routes} from './routes';


var module = angular.module('swimlane', ['ui.router', 'oc.lazyLoad', futureStateModule.name ]);

module.config(routes(module));

module.config(function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
  //$locationProvider.html5Mode(true);
  $httpProvider.useApplyAsync(true);
  $urlRouterProvider.otherwise('/login');
});

angular.element(document).ready(function() {
	angular.bootstrap(document.querySelector('[data-main-app]'), [ module.name ], {
		// strictDi: true // turning off for now
	});
});
