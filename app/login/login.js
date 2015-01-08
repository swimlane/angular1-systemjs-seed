import angular from 'angular';
import {selectModule} from 'common/components/select';

export var loginModule = angular.module('app.login', [selectModule.name]);

loginModule.controller('LoginCtrl', function($scope){
	$scope.loggedin = false;
});