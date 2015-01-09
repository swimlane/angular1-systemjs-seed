import angular from 'angular';
import modalModule from 'app/common/components/modal';
import selectModule from 'app/common/components/select';

export var dashboardModule = angular.module('dashboard', 
	[selectModule.name, modalModule.name]);

loginModule.controller('DashboardCtrl', function($scope){
	console.log('dashboard!')
});