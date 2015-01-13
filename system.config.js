System.config({
  //baseUrl: 'dist',
  meta: {
    'bower_components/angular/angular': { format: 'global', exports: 'angular' },
    'bower_components/angular-ui-router/release/angular-ui-router': { deps: ['angular'] },
    'bower_components/ocLazyLoad/dist/ocLazyLoad': { deps: ['angular'] }
  },
  map: {
    'src/app': 'dist/app',
    'src/common': 'dist/common',
    'css': 'bower_components/plugin-css/css',
    'json': 'bower_components/plugin-json/json',
    'angular': 'bower_components/angular/angular',
    'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
    'ocLazyLoad': 'bower_components/ocLazyLoad/dist/ocLazyLoad'
  }
  //bundles:{
  //  'core': ['jquery', 'app/app', 'app/dep', 'lib/third-party']
  //}
});
