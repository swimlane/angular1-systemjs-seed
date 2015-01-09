import angular from 'angular';
import modalModule from 'app/common/components/modal';

export var adminModule = angular.module('dashboard', [modalModule.name]);

loginModule.controller('AdminCtrl', function($scope){
	console.log('admin!')
});