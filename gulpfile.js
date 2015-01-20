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
  less: 'src/**/*.less',
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
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.html'}))
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
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.less'}))
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('es6', function () {
  return gulp.src(path.source)
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.js'}))
    .pipe(sourcemaps.init())
    .pipe(to5(compilerOptions))
    .pipe(ngAnnotate())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('compile', function(callback) {
  return runSequence(
    'clean',
    //['less', 'html', 'es6', 'move'],
    ['html', 'es6', 'move-json', 'move-less'],
    callback
  );
});

gulp.task('lint', function() {
  return gulp.src(path.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('move-json', function(){
  return gulp.src('./src/**/*.json')
    .pipe(changed(path.output, {extension: '.json'}))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('move-less', function(){
  return gulp.src('./src/**/*.less')
    .pipe(changed(path.output, {extension: '.less'}))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('serve', ['compile'], function(done) {
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

gulp.task('iis', ['compile'], function(done) {
  browserSync({
    proxy: "windows.local"
  }, done);
});

gulp.task('watch', ['serve'], function() {
  var watcher = gulp.watch([path.source, path.html], ['compile']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('steal', ['compile'], function(){
  var steal = require('steal-tools');
  steal.build({
    main: 'app/app',
    config: 'system.config.js'
  }, {
    minify: false,
    bundleSteal: false,
    bundle: ['app/login/login', 
      'app/admin/admin', 
      'app/dashboard/dashboard',
      'app/forms/forms']
  })
});

gulp.task('builder' , function(){
  var builder = require('./build/build');
  var routes = require('./src/app/routes.json');
  
  // just get the source of our routes
  routes = routes.map(function(r){
    return r.src;
  });

  builder.build({
    main: 'app/app',
    config: './system.config.js',
    bundles: routes
  });
});


gulp.task('depBuilder', ['compile'], function(){
  var depBuilder = require('./build/dep-builder');
  var routes = require('./src/app/routes.json');

  // just get the source of our routes
  routes = routes.map(function(r){
    return r.src;
  });

  depBuilder.build({
    main: 'app/app',
    config: './system.config.js',
    bundles: routes
  }).then(function(res){
    console.log(res);
  })

});
