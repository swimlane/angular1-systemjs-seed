import angular from 'angular';
import ModalModule from 'common/components/modal';
import SelectModule from 'common/components/select';
import DateModule from 'common/components/date';
import TimeModule from 'common/components/time';
import UsersTemplate from './users.tpl';

var usersModule = angular.module('admin.users', [
  ModalModule.name, 
  DateModule.name, 
  TimeModule.name, 
  SelectModule.name,
  UsersTemplate.name])
.config(function($stateProvider){
  $stateProvider.state('admin.users', {
    url: '/users',
    templateUrl: UsersTemplate.name,
    controller: 'UsersController',
    parent: 'admin'
  });
})

class UsersController{
  constructor($scope){
    console.log('users!')
  }
}

UsersController.$inject = ['$scope'];

usersModule.controller('UsersController', UsersController);

export default usersModule; 
