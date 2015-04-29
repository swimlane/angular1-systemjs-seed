import angular from 'angular';
import SelectModule from 'common/components/select';
import DateModule from 'common/components/date';
import ModalModule from 'common/components/modal';
import UserModule from 'common/services/user';
import LoginTemplate from './login.tpl';
import SignupTemplate from './signup.tpl';
import './login.css!';

class LoginController{
  /*@ngInject*/
  constructor($scope){
    $scope.loggedin = false;
    $scope.$watch('theme', function(newVal, oldVal, ev){
      if(!newVal) return;
      System.import('assets/' + newVal + '.css!').then(loaded => {
          angular.element(document.body).addClass(newVal);
      });
    });
  }
}

export default angular
  .module('login', [
    SelectModule.name,
    DateModule.name,
    ModalModule.name,
    UserModule.name,
    LoginTemplate.name,
    SignupTemplate.name])
  .config(['$stateProvider', function($stateProvider){
    $stateProvider.state('login', {
      url: '/login',
      templateUrl: LoginTemplate.name,
      controller: 'LoginController',
      controllerAs: 'loginCtrl'
    });

    $stateProvider.state('login.signup', {
      url: '/login/signup',
      templateUrl: 'app/login/signup.tpl.html'
    });
  }])
  .controller('LoginController', LoginController);
