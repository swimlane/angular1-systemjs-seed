import angular from 'angular';

export var routes = angular.module('app.routes', []);

routes.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'app/login/login.tpl.html',
        controller: 'LoginCtrl'
    });
    
    $stateProvider.state('forms', {
        url: '/forms',
        controller: 'FormsCtrl'
    });

    $stateProvider.state('dashboard', {
        url: '/dashboard',
        controller: 'DashboardCtrl'
    });

    $stateProvider.state('admin', {
        url: '/admin',
        controller: 'AdminCtrl'
    });

});