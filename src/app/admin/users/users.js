import angular from 'angular';
import {modalModule} from 'common/components/modal';
import {selectModule} from 'common/components/select';
import {dateModule} from 'common/components/date';
import {timeModule} from 'common/components/time';
import './users.tpl';

export var usersModule = angular.module('admin.users', [modalModule.name, dateModule.name, timeModule.name, 'app/admin/users/users.tpl.html']);

usersModule.controller('UsersController', function($scope){
  console.log('users!')
});
