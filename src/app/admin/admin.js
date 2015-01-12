import angular from 'angular';
import {modalModule} from 'src/common/components/modal';
import 'dist/app/admin/admin.tpl';


export var formModule = angular.module('admin', [modalModule.name, 'app/admin/admin.tpl.html']);

formModule.config(function($stateProvider){
  $stateProvider.state('admin', {
    url: '/admin',
    templateUrl: 'app/admin/admin.tpl.html',
    controller: 'AdminController'
  });
});

formModule.controller('AdminController', function($scope){
  console.log('admin!')
});
