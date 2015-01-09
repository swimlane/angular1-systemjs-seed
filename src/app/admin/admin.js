import angular from 'angular';
import modalModule from 'src/app/common/components/modal';

export var adminModule = angular.module('admin', [modalModule.name]);

loginModule.controller('AdminCtrl', function($scope){
	console.log('admin!')
});