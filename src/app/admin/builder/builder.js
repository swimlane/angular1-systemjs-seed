import angular from 'angular';
import ModalModule from 'common/components/modal';
import SelectModule from 'common/components/select';
import BuilderTemplate from './builder.tpl';

class BuilderController{
  /*@ngInject*/
  constructor($scope){
    console.log('builder!')
  }
}

export default angular
  .module('admin.builder', [
    ModalModule.name, 
    SelectModule.name,
    BuilderTemplate.name])
  .config(function($stateProvider){
    $stateProvider.state('admin.builder', {
      url: '/builder',
      templateUrl: BuilderTemplate.name,
      controller: 'BuilderController',
      controllerAs: 'builderCtrl'
    });
  })
  .controller('BuilderController', BuilderController);
