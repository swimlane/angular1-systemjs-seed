import angular from 'angular';
import {selectModule} from 'app/common/components/select';

export var loginModule = angular.module('login', [selectModule.name]);

loginModule.controller('LoginCtrl', $scope => {

  $scope.loggedin = false;
 
});