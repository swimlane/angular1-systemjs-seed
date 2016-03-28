import angular from 'angular';

import modalModule from 'common/components/modal.js';
import selectModule from 'common/components/select.js';

import { BuilderController } from './BuilderController.js';
import builderTemplate from './builder.tpl.js';

function ConfigureModule($stateProvider){
  "ngInject";

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
