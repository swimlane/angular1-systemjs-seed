import angular from 'angular';
import BuilderModule from './builder/builder'
import UsersModule from './users/users'
import AdminTemplate from './admin.tpl';

var adminModule = angular.module('admin', [
  BuilderModule.name,
  UsersModule.name,
  AdminTemplate.name,
  'access-module'])
.config(function($stateProvider, PERMISSIONS){
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: AdminTemplate.name,
    controller: 'AdminController',
    controllerAs: 'adminCtrl',
    access:{
      permissions: PERMISSIONS.viewAdmin
    }
  });
})

class AdminController{
  /*@ngInject*/
  constructor(){
    console.log('admin!');
  }
}

adminModule.controller('AdminController', AdminController);

export default adminModule;
