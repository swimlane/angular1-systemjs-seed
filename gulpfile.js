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
var replace = require('gulp-token-replace');


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

gulp.task('json', function () {
    return gulp.src('./src/**/*.json')
      .pipe(changed(path.output, { extension: '.json' }))
      .pipe(gulp.dest(path.output))
      .pipe(browserSync.reload({ stream: true }));
});

gulp.task('token-replace', function(){
  return gulp.src(['index.html'])
    .pipe(replace({global:{
      hash: Math.round(new Date() / 1000)
    }}))
    .pipe(gulp.dest('./'))
});

gulp.task('less-themes', function () {
    return gulp.src(path.themes)
      .pipe(plumber())
      .pipe(changed(path.output, {extension: '.less'}))
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(path.themesOutput))
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
    ['less', 'less-themes', 'html', 'es6', 'json'],
    callback
  );
});

gulp.task('lint', function() {
  return gulp.src(path.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
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
  var appTree;
  var routeTrees = [];
  var promises = [];
  promises.push(new RSVP.Promise(function(resolve, reject) {
    depBuilder.build({
      main: 'app/app',
      config: './system.config.js'
    }).then(function(tree){
      appTree = tree;
      resolve();
    });
  }));

  routes.forEach(function(route){
    promises.push(new RSVP.Promise(function(resolve, reject) {
      depBuilder.build({
        main: route,
        config: './system.config.js'
      }).then(function(tree){
        routeTrees.push(tree);
        resolve();
      });
    }));
  })

  RSVP.all(promises).then(function() {
    console.log('got all trees');

    // Removing app tree dependencies from route trees;
    Object.keys(appTree).forEach(function(moduleName){
      console.log('removing ' + moduleName);

      routeTrees.forEach(function(treeIndex){
        if (treeIndex[moduleName]){
          // deleting the dep tree
          delete treeIndex[moduleName];
          // removing dep from the other trees
          Object.keys(treeIndex).forEach(function(depName){
            treeIndex[depName].tree = builder.subtractTrees(treeIndex[depName].tree, appTree[moduleName].tree);
          });
        }
      });
    });

    // generating inverse index of dependencies
    var bundles = {};
    var inverseIndex = {};
    routeTrees.forEach(function(treeIndex, i){
      Object.keys(treeIndex).forEach(function(depName){
        if (inverseIndex[depName] === undefined){
          inverseIndex[depName] = [i];
        } else {
          inverseIndex[depName].push(i);
        }
      });
    });

    console.log('removed shared dependencies');
    // generating bundles
    Object.keys(inverseIndex).forEach(function(moduleName){
      console.log('---------------------------')
      console.log('processing ' + moduleName)
      // if it's included in only one route, leave it there
      if (inverseIndex[moduleName].length == 1){
        console.log('not a shared dependency - skipping')
        return;
      }

      var module = routeTrees[inverseIndex[moduleName][0]][moduleName];
      if (inverseIndex[moduleName].length / routeTrees.length >= 0.6){
        // if it's included in more than 60% of the routes, put it in app
        console.log('shared in more than 60% - including in app');
        appTree['app/app'].tree = builder.addTrees(appTree['app/app'].tree, module.tree);
        appTree[moduleName] = module;

      } else {
        // otherwise, put it in a bundle
        var bundleName = inverseIndex[moduleName].sort().join('-');
        console.log('creating bundle ' + bundleName);
        if (bundles[bundleName] === undefined){
          bundles[bundleName] = module;
        } else {
          bundles[bundleName].tree = builder.addTrees(bundles[bundleName].tree, module.tree);
        }
      }

      // remove from other trees;
      inverseIndex[moduleName].forEach(function(index){
        var treeIndex = routeTrees[index];
        delete treeIndex[moduleName];

        Object.keys(treeIndex).forEach(function(depName){
          treeIndex[depName].tree = builder.subtractTrees(treeIndex[depName].tree, module.tree);
        });

      })
    });

    console.log('building...');
    // build bundles
    var bundlesConfig = {};
    Object.keys(bundles).forEach(function(bundleName) {
      buildTree(bundles[bundleName], "bundles/" + bundleName);
      bundlesConfig["bundles/" + bundleName] = Object.keys(bundles[bundleName].tree);
    });
    // build route trees
    routeTrees.forEach(function(treeIndex){
      Object.keys(treeIndex).forEach(function(moduleName) {
        buildTree(treeIndex[moduleName], moduleName);
      });
    });
    // build root app
    Object.keys(appTree).forEach(function(moduleName) {
      buildTree(appTree[moduleName], moduleName).then(function(){
        if (moduleName === 'app/app'){
          var bundlesString = "System.bundles = " + JSON.stringify(bundlesConfig) + ";";

          gulp.src('dist/app/app.js')
            .pipe(insert.prepend(bundlesString))
            .pipe(gulp.dest('dist/app'));
        }
      })
    });

    console.log('build successful!')
  });

  var buildTree = function(tree, destination){
    if (destination.indexOf('bower_components') != 0){
      return builder.buildTree(tree.tree, 'dist/' + destination + '.js', {
        sourceMaps: true
        //minify: true
      })
    }
  }

});
