import angular from 'angular';

// does not work when the selectModule is bundled
import 'common/components/select.css!';

// works when the selectModule is bundled
// System.import('common/components/select.css!');

export var selectModule = angular.module('common.components.select', []);
