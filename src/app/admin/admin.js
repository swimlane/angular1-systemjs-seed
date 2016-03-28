import angular from 'angular';
import BuilderModule from 'app/admin/builder/builder.js'
import UsersModule from 'app/admin/users/users.js'

import { AdminController } from './AdminController.js';
import adminTemplate from './admin.tpl.js';

function ConfigureModule($stateProvider){
  "ngInject";

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
