import 'babel/external-helpers';

import angular from 'angular';
import 'angular-ui-router';
import 'ocLazyLoad';
import 'common/core';
import routing from 'common/utils/routing';

var module = angular.module('swimlane', ['ui.router', 'oc.lazyLoad' ]);

module.config(routing(module));

module.config(function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
  //$locationProvider.html5Mode(true);
  $httpProvider.useApplyAsync(true);
  $urlRouterProvider.otherwise('/login');
});

angular.element(document).ready(function() {
  angular.bootstrap(document.body, [ module.name ], {
    strictDi: true
  });
});

export default module;
