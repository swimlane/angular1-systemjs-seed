import angular from 'angular';
import {selectModule} from 'src/common/components/select';
import './forms.tpl';


export var formModule = angular.module('forms', [selectModule.name, 'app/forms/forms.tpl.html']);

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
