`import angular from 'angular'`
`import {modalModule} from 'common/components/modal'`
`import {popupModule} from 'common/components/popup'`
`import {timeModule} from 'common/components/time'`
`import './dashboards.tpl'`

`export var dashboardModule = angular.module('dashboard',
  [modalModule.name, popupModule.name, timeModule.name, 'app/dashboard/dashboards.tpl.html'])`

dashboardModule.config ($stateProvider) ->
  $stateProvider.state('dashboards', {
    url: '/dashboards',
    templateUrl: 'app/dashboard/dashboards.tpl.html',
    controller: 'DashboardCtrl'
  })

dashboardModule.controller('DashboardCtrl', ($scope) ->
  console.log('dashboard!')
)
