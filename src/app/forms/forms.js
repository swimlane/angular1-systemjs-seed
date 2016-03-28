import angular from 'angular';
import modalModule from 'common/components/modal.js';
import formsTemplate from './forms.tpl.js';

function ConfigureModule($stateProvider){
  "ngInject";

  $stateProvider.state('forms', {
    url: '/forms',
    templateUrl: formsTemplate.name
  });
}

export default angular
  .module('forms', [
    formsTemplate.name,
    modalModule.name
  ])
  .config(ConfigureModule);
