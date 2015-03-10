import angular from 'angular';
import BuilderModule from './builder/builder'
import UsersModule from './users/users'
import AdminTemplate from './admin.tpl';

var adminModule = angular.module('admin', [ 
  BuilderModule.name, 
  UsersModule.name, 
  AdminTemplate.name])
.config(function($stateProvider){
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: AdminTemplate.name,
    controller: 'AdminController'
  });
})

class AdminController{
  constructor(){
    console.log('admin!');
  }
}

adminModule.controller('AdminController', AdminController);

export default adminModule;
