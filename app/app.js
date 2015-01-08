var angular = require('angular');

var module = angular.module('swimlane', []);

//module.config(function ($urlRouterProvider, $locationProvider, $stateProvider) {
//    $locationProvider.html5Mode(true);
//});

module.run(function($document){
    $document[0].write('Hello from myApp. ');
});