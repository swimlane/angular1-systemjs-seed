/**
 * Demonstrates AMD.  THIS IS JUST FOR TESTING!
 */
define(['angular', 'common/components/modal', './forms.tpl'], function(angular){

  var formModule = angular.module('forms', ['app/forms/forms.tpl.html', 'common.components.modal']);

  formModule.config(function($stateProvider){
    $stateProvider.state('forms', {
      url: '/forms',
      templateUrl: 'app/forms/forms.tpl.html',
      controller: 'FormsCtrl'
    });
  });

  formModule.controller('FormsCtrl', $scope => {
      console.log('forms!');
  });

  return formModule;

});
