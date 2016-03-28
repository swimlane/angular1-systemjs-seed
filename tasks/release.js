var gulp = require('gulp');
var insert = require('gulp-insert');
var concatFile = require('gulp-concat');
var runSequence = require('run-sequence');
var routeBundler = require('systemjs-route-bundler');
var paths = require('./paths');
var Builder = require('systemjs-builder');

gulp.task('release', function(callback) {
  process.env.NODE_ENV = 'production';
  return runSequence(
    'clean',
    'build',
    'release:bundle',
    'release:cache-bust',
    'replace',
    'release:inline-systemjs',
    callback);
});

gulp.task('release:cache-bust', function() {
  var cacheBust = 'var systemLocate = System.locate; System.locate = function(load) { var cacheBust = \'?bust=\' + ' + Math.round(new Date() / 1000) + '; return Promise.resolve(systemLocate.call(this, load)).then(function(address) { if (address.indexOf(\'bust\') > -1 || address.indexOf(\'css\') > -1 || address.indexOf(\'json\') > -1) return address; return address + cacheBust; });}\n';
  return gulp.src('dist/app/app.js')
    .pipe(insert.prepend('window.prod = true;\n'))
    .pipe(insert.prepend(cacheBust))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('release:inline-systemjs', function() {
  return gulp.src([
      './jspm_packages/system-polyfills.js',
      './jspm_packages/system.js',
      './jspm.config.js',
      './jspm.browser.js',
      './dist/app/app.js',
    ])
    .pipe(concatFile('app/app.js'))
    .pipe(gulp.dest(paths.output));
});

gulp.task('release:bundle', function() {
  var routes = require('../dist/app/routes.json');
  routes = routes.map(function(r) {
    return r.src;
  });

  var config = {
    baseURL: '',
    dest: 'dist',
    main: 'app/app.js',
    destMain: 'dist/app',
    routes: routes,
    bundleThreshold: 0.6,
    jspmConfigPath: 'jspm.config.js',
    jspmBrowserPath: 'jspm.browser.js',
    sourceMaps: false,
    minify: true,
    mangle: true,
    verboseOutput: true,
    ignoredPaths: [
      'jspm_packages',
      'bower_components',
      'npm:',
      'github:'
    ],
  };

  return routeBundler.build(config);
});

gulp.task('release:single', function() {
  var config = {
    baseURL: '',
    dest: 'dist',
    main: 'app/app.js',
    jspmConfigPath: 'jspm.config.js'
  };

  builder = new Builder(config.baseURL);

  return builder.loadConfig(config.jspmConfigPath, undefined, true).then(function() {
    return builder.buildStatic(config.main, config.dest + '/' + config.main, { runtime: false, browser: true, node: false, format: 'umd' });
  });
});
