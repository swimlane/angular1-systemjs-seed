var gulp = require('gulp');
var plumber = require('gulp-plumber');
var to5 = require('gulp-6to5');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var runSequence = require('run-sequence');
var vinylPaths = require('vinyl-paths');
var del = require('del');
var stylish = require('jshint-stylish');
var assign = Object.assign || require('object.assign');
var sourcemaps = require("gulp-sourcemaps");
var ngHtml2Js = require("gulp-ng-html2js");
var htmlMin = require('gulp-minify-html');
var builder = require('systemjs-builder');
var RSVP = require('rsvp');
var less = require('gulp-less');
var karma = require('karma').server;
var insert = require('gulp-insert');
var ngAnnotate = require('gulp-ng-annotate');
var fs = require('fs');
var replace = require('gulp-replace-task');
var cache = require('gulp-cached');
var uglify = require('gulp-uglify');

var compilerOptions = {
  filename: '',
  filenameRelative: '',
  blacklist: [],
  whitelist: [],
  //modules: 'system',
  //sourceMap: true,
  //sourceMapName: '',
  //sourceFileName: '',
  sourceRoot: '',
  moduleRoot: '',
  moduleIds: false,
  runtime: false,
  experimental: false,
  format: {
    comments: false,
    compact: false,
    indent: {
      parentheses: true,
      adjustMultilineComment: true,
      style: "  ",
      base: 0
    }
  }
};

var path = {
  source:'src/**/*.js',
  html:'**/*.html',
  templates: 'src/**/*.html',
  less: ['src/**/*.less', '!src/assets/**/*.less'],
  themes: ['src/assets/dark.less', 'src/assets/light.less'],
  themesOutput:'dist/assets/',
  output:'dist/'
};


gulp.task('test', ['compile'], function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('clean', function() {
  return gulp.src([path.output])
    .pipe(vinylPaths(del));
});

gulp.task('html', function () {
  return gulp.src(path.templates)
    .pipe(cache('html'))
    .pipe(plumber())
    .pipe(changed(path.output, { extension: '.html' }))
    .pipe(htmlMin({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(ngHtml2Js())

    // not entirely sure this is needed....
    .pipe(insert.prepend("import angular from 'angular';\n"))
    .pipe(to5(compilerOptions))

    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('less', function () {
  return gulp.src(path.less)
    .pipe(cache('less'))
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.less'}))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('move', function () {
  return gulp.src([
      './src/**/*.json', 
      './src/**/*.svg',
      './src/**/*.woff',
      './src/**/*.ttf',
      './src/**/*.png',
      './src/**/*.ico',
      './src/**/*.jpg',
      './src/**/*.eot'])
    .pipe(cache('move'))
    //.pipe(changed(path.output, { extension: '.json' }))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('json', function () {
  return gulp.src('./src/**/*.json')
    .pipe(changed(path.output, { extension: '.json' }))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('cache-bust', function(){
  return gulp.src('./index.html')
    .pipe(replace({
      usePrefix: false,
      patterns: [
        {
          match: '<!--PROD',
          replacement: ''
        },
        {
          match: 'END-->',
          replacement: ''
        },
        {
          match: '{{hash}}',
          replacement: Math.round(new Date() / 1000)
        }
      ]
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('less-themes', function () {
    return gulp.src(path.themes)
      .pipe(cache('less-themes'))
      .pipe(plumber())
      .pipe(less())
      .pipe(gulp.dest(path.themesOutput))
      .pipe(browserSync.reload({ stream: true }));
});

gulp.task('es6', function () {
  return gulp.src(path.source)
    .pipe(cache('es6'))
    .pipe(plumber())
    .pipe(changed(path.output, { extension: '.js' }))
    .pipe(sourcemaps.init())
    .pipe(to5(compilerOptions))
    .pipe(ngAnnotate(
      {sourceMap : true}
    ))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});


gulp.task('compile', function (callback) {
  return runSequence(
    ['less', 'less-themes', 'html', 'es6', 'move'],
    callback
  );
});

gulp.task('recompile', function (callback) {
  return runSequence(
    'clean',
    ['compile'],
    callback
  );
});

gulp.task('minify', function(){
  var condition = '**/routing.js';
  return gulp.src([
      'dist/**/*.js',
      '!**/routing.js',
      '!**/lazy-routes.js',
      '!**/routes.js'
    ])
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify(
      {mangle: false}
    ))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.output))
});

gulp.task('release', function(callback) {
  return runSequence(
    ['build', 'cache-bust'],
    'minify',
    callback
  );
});

gulp.task('lint', function() {
  return gulp.src(path.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('serve', ['recompile'], function (done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

gulp.task('watch', ['serve'], function() {
  var watcher = gulp.watch([path.source, path.html, path.less, path.themes], ['compile']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('build', ['recompile'], function () {
  var depBuilder = require('./builder/builder');
  var routes = require('./src/app/routes.json');
  
  // get the source paths of our routes
  routes = routes.map(function (r) { return r.src; });

  var config = {
    main: 'app/app',
    routes: routes,
    bundleThreshold: 0.6,
    config: './system.config.js',
    sourceMaps: true,
    minify: false
  }

  return depBuilder.build(config);
});
