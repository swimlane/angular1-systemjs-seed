import angular from 'angular';
import {modalModule} from './modal';
import {selectModule} from './select';

export var popupModule = angular.module('common.components.popup', 
  [modalModule.name, selectModule.name]);
