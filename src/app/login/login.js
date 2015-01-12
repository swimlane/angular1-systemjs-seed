import angular from 'angular';
import {selectModule} from 'src/common/components/select';
import 'dist/app/login/login.tpl';


export var loginModule = angular.module('login', [selectModule.name]);

loginModule.config(function($stateProvider){
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'src/app/login/login.tpl.html',
    controller: 'LoginController'
  });
});

loginModule.controller('LoginController', $scope => {
  $scope.loggedin = false;
});
