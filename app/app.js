import angular from 'angular';
import 'angular-ui-router';
import {loginModule} from 'app/login/login'

var module = angular.module('swimlane', ['ui.router', loginModule.name]);

module.config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
    //$locationProvider.html5Mode(true);
});

module.run(function($state){
    $state.go('login');
});

//angular.element(document).ready(function() {
//	angular.bootstrap(document, [module.name]);
//});