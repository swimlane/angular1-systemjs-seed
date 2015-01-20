import angular from 'angular';
import {selectModule} from 'common/components/select';
import {dateModule} from 'common/components/date';
import {modalModule} from 'common/components/modal';
import {userModule} from 'common/services/user';
import './login.tpl';
import './signup.tpl';
import './login.css!';


export var loginModule = angular.module('login', [selectModule.name, dateModule.name, modalModule.name, userModule.name,
  'app/login/login.tpl.html', 'app/login/signup.tpl.html']);

loginModule.config(function($stateProvider){
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/login/login.tpl.html',
    controller: 'LoginController'
  });

  $stateProvider.state('login.signup', {
    url: '/login/signup',
    templateUrl: 'app/login/signup.tpl.html'
  });
});

loginModule.controller('LoginController', $scope => {
  $scope.loggedin = false;

  $scope.$watch('theme', function(ev, newVal, oldVal){

    // switch to css if production
    var name = window.dev ? 'less' : 'css';
    System.import('assets/' + newVal + '.' + name + '!').then(loaded => {
        angular.element('body').addClass(newVal);
    });

  });

});
