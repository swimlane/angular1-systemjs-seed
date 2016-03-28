import angular from 'angular';

import { modalModule } from 'common/core.js';
import popupModule from 'common/components/popup.js';
import timeModule from 'common/components/time.js';

import { DashboardController } from './DashboardController.js';
import dashboardTemplate from './dashboards.tpl.js';

function ConfigureModule($stateProvider){
  "ngInject";

  $stateProvider.state('dashboards', {
    url: '/dashboards',
    templateUrl: dashboardTemplate.name,
    controller: DashboardController,
    controllerAs: 'dashboardCtrl'
  });
}

export default angular
  .module('dashboard', [
    modalModule.name,
    popupModule.name,
    timeModule.name,
    dashboardTemplate.name
  ])
  .config(ConfigureModule);
