import angular from 'angular';
import selectModule from 'app/common/components/select';

export var loginModule = angular.module('forms', [selectModule.name]);

loginModule.controller('FormsCtrl', function($scope){
	console.log('forms!')
});