import angular from 'angular';
import SelectModule from 'common/components/select';
import DateModule from 'common/components/date';
import ModalModule from 'common/components/modal';
import UserModule from 'common/services/user';
import './login.tpl';
import './signup.tpl';
import './login.css!';


var loginModule = angular.module('login', [
  SelectModule.name, 
  DateModule.name, 
  ModalModule.name, 
  UserModule.name,
  'app/login/login.tpl.html', 
  'app/login/signup.tpl.html'])
.config(function($stateProvider){
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'app/login/login.tpl.html',
    controller: 'LoginController'
  });

  $stateProvider.state('login.signup', {
    url: '/login/signup',
    templateUrl: 'app/login/signup.tpl.html'
  });
})

class LoginController{
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

LoginController.$inject = ['$scope'];

loginModule.controller('LoginController', LoginController);

export default loginModule;
