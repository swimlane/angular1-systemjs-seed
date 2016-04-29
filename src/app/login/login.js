import angular from 'angular';

import SelectModule from 'common/components/select';
import DateModule from 'common/components/date';
import ModalModule from 'common/components/modal';
import UserModule from 'common/services/user';

import { LoginController } from './LoginController';
import loginTemplate from './login.tpl';
import signupTemplate from './signup.tpl';
import './login.css!';

/* @ngInject */
function ConfigureModule($stateProvider){
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: loginTemplate.name,
    controller: LoginController,
    controllerAs: 'loginCtrl'
  });

  $stateProvider.state('login.signup', {
    url: '/login/signup',
    templateUrl: signupTemplate.name
  });
}

export default angular
  .module('login', [
    SelectModule.name,
    DateModule.name,
    ModalModule.name,
    UserModule.name,
    loginTemplate.name,
    signupTemplate.name
  ])
  .config(ConfigureModule);
