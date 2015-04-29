import angular from 'angular';
import ModalModule from 'common/components/modal';
import formsTemplate from './forms.tpl';

export default angular
  .module('forms', ['app/forms/forms.tpl.html', 'common.components.modal'])
  .config(function($stateProvider){
    $stateProvider.state('forms', {
      url: '/forms',
      templateUrl: 'app/forms/forms.tpl.html',
      controller: 'FormsCtrl'
    });
  })
  .controller('FormsCtrl', $scope => {
      console.log('forms!');
  });
