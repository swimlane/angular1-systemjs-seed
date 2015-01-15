import angular from 'angular';
import {modalModule} from 'src/common/components/modal';
import {selectModule} from 'src/common/components/select';
import './users.tpl';

export var usersModule = angular.module('admin.users', [modalModule.name, 'app/admin/users/users.tpl.html']);

usersModule.controller('UsersController', function($scope){
  console.log('users!')
});
