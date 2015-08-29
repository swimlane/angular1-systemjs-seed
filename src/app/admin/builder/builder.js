import angular from 'angular';

import modalModule from 'common/components/modal';
import selectModule from 'common/components/select';

import { BuilderController } from './BuilderController';
import builderTemplate from './builder.tpl';

function ConfigureModule($stateProvider){
  $stateProvider.state('admin.builder', {
    url: '/builder',
    templateUrl: builderTemplate.name,
    controller: BuilderController,
    controllerAs: 'builderCtrl'
  });
}

export default angular
  .module('admin.builder', [
    modalModule.name, 
    selectModule.name,
    builderTemplate.name
  ])
  .config(ConfigureModule);
