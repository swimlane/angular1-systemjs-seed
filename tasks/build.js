var gulp = require('gulp');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var ngAnnotate = require('gulp-ng-annotate');
var htmlmin = require('gulp-minify-html');
var ngHtml2Js = require('gulp-ng-html2js');
var runSequence = require('run-sequence');
var path = require('path');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var paths = require('./paths');
var babelHelpers = require('gulp-babel-external-helpers');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');

function isProd() {
  return process.env.NODE_ENV === 'production';
}

function isWatch() {
  return global.watch === true;
}

gulp.task('build', function (callback) {
  return runSequence(
    'clean',
    ['build:web'],
    callback
  );
});

gulp.task('build:web', function(callback) {
  return runSequence(
    'clean',
    'move',
    ['build:sass', 'build:html', 'build:js'],
    callback);
});

gulp.task('build:js', function() {
  return gulp.src(paths.js)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, { extension: '.js' }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(babel())
    .pipe(ngAnnotate())
    .pipe((!isWatch(), babelHelpers('babelHelpers.js')))
    .pipe(sourcemaps.write('/sourcemaps', { sourceRoot: '/' }))
    .pipe(gulp.dest(paths.output));
});

gulp.task('build:html', function() {
  return gulp.src(paths.html, { base: 'src' })
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, { extension: '.html' }))
    .pipe(gulpif(isProd(),
      htmlmin({
        empty: true,
        spare: true,
        quotes: true
      })))
    .pipe(ngHtml2Js({
      template: 'import angular from \'angular\';\n' +
        'export default angular.module(\'<%= moduleName %>\', []).run([\'$templateCache\', function($templateCache) {\n' +
        '   $templateCache.put(\'<%= template.url %>\',\n    \'<%= template.prettyEscapedContent %>\');\n' +
        '}]);\n',
    }))
    .pipe(babel())
    .pipe(gulp.dest(paths.output));
});

gulp.task('build:sass', function() {
  return gulp.src(paths.scss)
    .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
    .pipe(changed(paths.output, {extension: '.scss'}))
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: [
          path.join(__dirname, '../src/assets/styles')
        ],
        outputStyle: isProd() ? 'nested' : 'compressed'
      })
      .on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.output))
});
