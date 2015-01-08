import angular from 'angular';
import selectModule from 'common/components/select';

export var loginModule = angular.module('app.forms', [selectModule.name]);

loginModule.controller('FormsCtrl', function($scope){
	console.log('forms!')
});