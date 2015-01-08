import angular from 'angular';
import modalModule from 'common/components/modal';
import selectModule from 'common/components/select';

export var dashboardModule = angular.module('app.dashboard', 
	[selectModule.name, modalModule.name]);

loginModule.controller('DashboardCtrl', function($scope){
	console.log('dashboard!')
});