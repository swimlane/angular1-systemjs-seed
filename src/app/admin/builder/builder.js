import angular from 'angular';
import ModalModule from 'common/components/modal';
import SelectModule from 'common/components/select';
import './builder.tpl';

var builderModule = angular.module('admin.builder', [
  ModalModule.name, 
  SelectModule.name,
  'app/admin/builder/builder.tpl.html'])

class BuilderController{
  constructor($scope){
    console.log('builder!')
  }
}

BuilderController.$inject = ['$scope'];

builderModule.controller('BuilderController', BuilderController);

export default builderModule; 
