import angular from 'angular';
import {modalModule} from 'common/components/modal';
import './forms.tpl';


export var formModule = angular.module('forms', ['app/forms/forms.tpl.html']);

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
