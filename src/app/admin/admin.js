import angular from 'angular';
import BuilderModule from './builder/builder'
import UsersModule from './users/users'
import './admin.tpl';

var adminModule = angular.module('admin', [ 
  BuilderModule.name, 
  UsersModule.name, 
  'app/admin/admin.tpl.html'])
.config(function($stateProvider){
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: 'app/admin/admin.tpl.html',
    controller: 'AdminController'
  });

  $stateProvider.state('admin.builder', {
    url: '/builder',
    templateUrl: 'app/admin/builder/builder.tpl.html',
    controller: 'BuilderController',
    parent: 'admin'
  });

  $stateProvider.state('admin.users', {
    url: '/users',
    templateUrl: 'app/admin/users/users.tpl.html',
    controller: 'UsersController',
    parent: 'admin'
  });
})

class AdminController{
  constructor(){
    console.log('admin!');
  }
}

adminModule.controller('AdminController', AdminController);

export default adminModule;
