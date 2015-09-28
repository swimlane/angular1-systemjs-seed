var gulp = require('gulp');
var insert = require('gulp-insert');
var concatFile = require('gulp-concat');
var runSequence = require('run-sequence');
var routeBundler = require('systemjs-route-bundler');
var paths = require('../paths');

gulp.task('cache-bust', function () {
  var cacheBust = "var systemLocate = System.locate; System.locate = function(load) { var cacheBust = '?bust=' + " + Math.round(new Date() / 1000) +"; return Promise.resolve(systemLocate.call(this, load)).then(function(address) { if (address.indexOf('bust') > -1 || address.indexOf('css') > -1 || address.indexOf('json') > -1) return address; return address + cacheBust; });}\n"
  return gulp.src('dist/app/app.js')
    .pipe(insert.prepend("window.prod = true;\n"))
    .pipe(insert.prepend(cacheBust))
    .pipe(gulp.dest('dist/app'));
});

gulp.task('inline-systemjs', function () {
  return gulp.src([
    './jspm_packages/es6-module-loader.js',
    './jspm_packages/system.js',
    './system.config.js',
    'dist/app/app.js'
  ])
  //.pipe(uglify())
  .pipe(concatFile('app/app.js'))
  .pipe(gulp.dest(paths.output));
});

gulp.task('release', function (callback) {
  return runSequence(
    'clean',
    'build',
    'bundle',
    'cache-bust',
    'replace',
    'inline-systemjs',
    callback
  );
});

gulp.task('bundle', function () {
  var routes = require('../../dist/app/routes.json');
  routes = routes.map(function (r) {
    return r.src;
  });

  var config = {
    dest: 'dist',
    main: 'app/app.js',
    destMain: 'dist/app',
    routes: routes,
    bundleThreshold: 0.6,
    systemConfig: './system.config.js',
    sourceMaps: false,
    minify: true,
    mangle: true,
    verboseOutput: true,
    ignoredPaths: [
      'jspm_packages',
      'npm:',
      'github:'
    ]
  };

  return routeBundler.build(config);
});
