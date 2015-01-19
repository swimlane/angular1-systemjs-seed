import angular from 'angular';
import {modalModule} from 'common/components/modal';
import {selectModule} from 'common/components/select';
import './users.tpl';

export var usersModule = angular.module('admin.users', [modalModule.name, 'app/admin/users/users.tpl.html']);

usersModule.controller('UsersController', function($scope){
  console.log('users!')
});
