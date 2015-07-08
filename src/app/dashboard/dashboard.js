import angular from 'angular';
import 'common/core';
import ModalModule from 'common/components/modal';
import PopupModule from 'common/components/popup';
import TimeModule from 'common/components/time';
import DashboardTemplate from './dashboards.tpl';

class DashboardCtrl{
  /*@ngInject*/
  constructor($scope){
    console.log('dashboard!');
  }
}

export default angular
  .module('dashboard', [
    ModalModule.name,
    PopupModule.name,
    TimeModule.name,
    DashboardTemplate.name,
    'access-module'])
  .config(function($stateProvider, PERMISSIONS){
    $stateProvider.state('dashboards', {
      url: '/dashboards',
      templateUrl: DashboardTemplate.name,
      controller: 'DashboardCtrl',
      controllerAs: 'dashboardCtrl',
      access: {
        permissions: PERMISSIONS.viewDashboard
      }
    });
  })
  .controller('DashboardCtrl', DashboardCtrl);
