import angular from 'angular';
import ModalModule from 'common/components/modal';
import SelectModule from 'common/components/select';
import DateModule from 'common/components/date';
import TimeModule from 'common/components/time';
import UsersTemplate from './users.tpl';

class UsersController{
  /*@ngInject*/
  constructor($scope){
    console.log('users!')
  }
}

export default angular
  .module('admin.users', [
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
      controllerAs: 'userCtrl'
    });
  })
  .controller('UsersController', UsersController);
