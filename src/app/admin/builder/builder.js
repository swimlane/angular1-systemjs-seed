import angular from 'angular';
import {modalModule} from 'src/common/components/modal';
import {futureStateModule} from 'src/common/utils/lazy-routes';
import './builder.tpl';

export var builderModule = angular.module('admin.builder', [modalModule.name, 'app/admin/builder/builder.tpl.html']);

builderModule.controller('BuilderController', function($scope){
  console.log('builder!')
});
