import angular from 'angular';
import modalModule from 'common/components/modal';

export var adminModule = angular.module('app.dashboard', [modalModule.name]);

loginModule.controller('AdminCtrl', function($scope){
	console.log('admin!')
});