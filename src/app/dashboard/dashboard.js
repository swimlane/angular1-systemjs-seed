import angular from 'angular';
import ModalModule from 'common/components/modal';
import PopupModule from 'common/components/popup';
import TimeModule from 'common/components/time';
import DashboardTemplate from './dashboards.tpl';

var dashboardModule = angular.module('dashboard', [
  ModalModule.name, 
  PopupModule.name, 
  TimeModule.name, 
  DashboardTemplate.name])
.config(function($stateProvider){
  $stateProvider.state('dashboards', {
    url: '/dashboards',
    templateUrl: DashboardTemplate.name,
    controller: 'DashboardCtrl'
  });
});

class DashboardCtrl{
  constructor($scope){
    console.log('dashboard!');
  }
}

DashboardCtrl.$inject = ['$scope'];

dashboardModule.controller('DashboardCtrl', DashboardCtrl);

export default dashboardModule; 
