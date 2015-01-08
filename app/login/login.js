import angular from 'angular';

export var loginModule = angular.module('app.login', []);

loginModule.config(function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/login/login.tpl.html',
        controller: 'LoginCtrl'
    });
});

loginModule.controller('LoginCtrl', function($scope){
	$scope.loggedin = false;
});