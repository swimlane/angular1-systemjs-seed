import angular from 'angular';
import {selectModule} from 'src/common/components/select';
import 'dist/app/login/login.tpl';
import 'dist/app/login/signup.tpl';


export var loginModule = angular.module('login', [selectModule.name, 
  'app/login/login.tpl.html', 'app/login/signup.tpl.html']);

loginModule.config(function($stateProvider){
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/login/login.tpl.html',
    controller: 'LoginController'
  });

  $stateProvider.state('login.signup', {
    url: '/login/signup',
    templateUrl: 'app/login/signup.tpl.html'
  });
});

loginModule.controller('LoginController', $scope => {
  $scope.loggedin = false;
});
