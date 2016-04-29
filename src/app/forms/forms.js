import angular from 'angular';
import modalModule from 'common/components/modal';
import formsTemplate from './forms.tpl';

/* @ngInject */
function ConfigureModule($stateProvider){
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
