import angular from 'angular';
import {modalModule} from 'src/common/components/modal';
import {selectModule} from 'src/common/components/select';
import {futureStateModule} from 'src/commom/utils/lazy-router';
import './builder.tpl';

export var builderModule = angular.module('admin.builder', [modalModule.name, 'app/admin/builder/builder.tpl.html']);

builderModule.controller('BuilderController', function($scope){
  console.log('builder!')
});
