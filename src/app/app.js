import 'babel/external-helpers';

import angular from 'angular';
import 'angular-ui-router';
import 'ocLazyLoad';
import 'common/core';
import AccessModule from 'common/services/access';
import routing from 'common/utils/routing';


var app = angular.module('swimlane', ['ui.router', 'oc.lazyLoad', 'access-module']);

app.config(routing(app));

app.config(function ($urlRouterProvider, $locationProvider, $stateProvider, $httpProvider) {
  //$locationProvider.html5Mode(true);
  $httpProvider.useApplyAsync(true);
  $urlRouterProvider.otherwise('/login');
});

angular.element(document).ready(function() {
  angular.bootstrap(document.body, [ app.name ], {
    // strictDi: true
  });
});

app.run(function ($rootScope, $q, $location, $state, $stateParams, $injector, $timeout, Access) {
  $rootScope.$on("$stateChangeStart", function (event, cur, curParams, old, oldParams) {
    if (!Access.canAccessRoute(cur)){
      event.preventDefault()
      console.log('ACCESS DENIED. Redirecting to previous route');
      alert('ACCESS DENIED');
    }
  });
});

export default app;
