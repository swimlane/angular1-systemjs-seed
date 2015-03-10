import angular from 'angular';
import ModalModule from 'common/components/modal';
import SelectModule from 'common/components/select';
import BuilderTemplate from './builder.tpl';

var builderModule = angular.module('admin.builder', [
  ModalModule.name, 
  SelectModule.name,
  BuilderTemplate.name])
.config(function($stateProvider){
  $stateProvider.state('admin.builder', {
    url: '/builder',
    templateUrl: BuilderTemplate.name,
    controller: 'BuilderController',
    parent: 'admin'
  });
})

class BuilderController{
  constructor($scope){
    console.log('builder!')
  }
}

BuilderController.$inject = ['$scope'];

builderModule.controller('BuilderController', BuilderController);

export default builderModule; 
