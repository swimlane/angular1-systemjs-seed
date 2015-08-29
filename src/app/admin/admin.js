import angular from 'angular';
import builderModule from './builder/builder'
import usersModule from './users/users'

import { AdminController } from './AdminController';
import adminTemplate from './admin.tpl';

function ConfigureModule($stateProvider){
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: adminTemplate.name,
    controller: AdminController,
    controllerAs: 'adminCtrl'
  });
}

export default angular
  .module('admin', [
    builderModule.name,
    usersModule.name,
    adminTemplate.name 
  ])
  .config(ConfigureModule);
