import angular from 'angular';
import {selectModule} from 'src/common/components/select';

export var loginModule = angular.module('login', [selectModule.name]);

loginModule.states = [{
  name: 'login',
  url: '/login',
  templateUrl: 'src/app/login/login.tpl.html',
  controller: 'LoginController'
}];

loginModule.controller('LoginController', $scope => {
  $scope.loggedin = false;
});
