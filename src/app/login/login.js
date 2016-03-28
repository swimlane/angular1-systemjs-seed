import angular from 'angular';

import SelectModule from 'common/components/select.js';
import DateModule from 'common/components/date.js';
import ModalModule from 'common/components/modal.js';
import UserModule from 'common/services/user.js';

import { LoginController } from './LoginController.js';
import loginTemplate from './login.tpl.js';
import signupTemplate from './signup.tpl.js';
import './login.css!';

function ConfigureModule($stateProvider){
  'ngInject';

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
