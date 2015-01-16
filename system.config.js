System.config({
  baseURL: 'dist',
  meta: {
    'bower_components/angular/angular': { format: 'global', exports: 'angular' },
    'bower_components/angular-mocks/angular-mocks': { deps: ['angular'] },
    'bower_components/angular-ui-router/release/angular-ui-router': { deps: ['angular'] },
    'bower_components/ocLazyLoad/dist/ocLazyLoad': { deps: ['angular'] }
  },
  map: {
    'css': 'bower_components/plugin-css/css',
    'json': 'bower_components/plugin-json/json',
    'angular': 'bower_components/angular/angular',
    'angular-mocks': 'bower_components/angular-mocks/angular-mocks',
    'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router',
    'ocLazyLoad': 'bower_components/ocLazyLoad/dist/ocLazyLoad'
  },
  paths: {
    '*': '*.js',
    'systemjs-test/*': 'src/*.js',
    'bower_components/*': '../bower_components/*.js'
  },
  // only temp for steal build
  bundle: ['dist/app/login/login', 
    'dist/app/admin/admin', 
    'dist/app/dashboard/dashboard', 
    'dist/app/forms/forms']
});
