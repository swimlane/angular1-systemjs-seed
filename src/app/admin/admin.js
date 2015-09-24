import angular from 'angular';
import BuilderModule from 'app/admin/builder/builder'
import UsersModule from 'app/admin/users/users'

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
    BuilderModule.name,
    UsersModule.name,
    adminTemplate.name
  ])
  .config(ConfigureModule);
