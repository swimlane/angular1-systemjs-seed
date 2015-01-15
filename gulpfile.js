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

var AssetGraph = require('assetgraph');
var systemJsAssetGraph = require('systemjs-assetgraph');


var compilerOptions = {
  filename: '',
  filenameRelative: '',
  blacklist: [],
  whitelist: [],
  modules: '',
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
    .pipe(ngHtml2Js({
      //moduleName: "templates",
    }))

    // not entirely sure this is needed....
    .pipe(insert.prepend("import angular from 'angular';\n"))
    //.pipe(to5(assign({}, compilerOptions, {modules:'system'})))

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
    //.pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    //.pipe(ngAnnotate())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('compile', function(callback) {
  return runSequence(
    //'clean',
    ['less', 'html', 'es6', 'move'],
    callback
  );
});

gulp.task('lint', function() {
  return gulp.src(path.source)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('move', function(){
  return gulp.src('./src/**/*.json')
    .pipe(changed(path.output, {extension: '.json'}))
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


// addTrees, subtractTrees, intersectTrees and extractTree

gulp.task('tree', ['compile'], function() {

  var allTrees = {};

  var startsrc = 'dist/app/admin/admin';
  builder.loadConfig('./system.config.js').then(function(){
    var buildDeps = function(src, level){
      // trace source to get dependency tree
      return builder.trace(src).then(function(traceTree){
        if (allTrees[traceTree.moduleName]){
          traceTree = allTrees[traceTree.moduleName];
        }

        // extract dependency source paths
        var sources = Object.keys(traceTree.tree);
        console.log('-----------------------------------------------')
        console.log('building source ' + src);
        console.log('level ' + level)
        console.log('dependencies: ');
        console.log(sources)
        
        // process each dependency individually, and collect their trees
        var subTrees = [];
        var promises = [];
        sources.forEach(function(source){
          if (source === src || source.indexOf('bower_components') == 0 || source.indexOf('tpl') != -1){
            return;
          }

          promises.push(new RSVP.Promise(function(resolve, reject) {
            buildDeps(source, level + 1).then(function(subTree){              
              subTrees.push(subTree);
              resolve();
            });
          }));
        })
        
        return RSVP.all(promises).then(function(){
          console.log("subtrees: " + subTrees.length);

          // extract common tree
          var commonTree = subTrees[0].tree;
          subTrees.forEach(function(tree, i){          
            commonTree = builder.intersectTrees(commonTree, tree.tree);
          })

          // remove common tree from subtrees
          subTrees.forEach(function(tree, i){        
            traceTree.tree = builder.subtractTrees(traceTree.tree, tree.tree);
          })

          // add common tree to parent
          traceTree.tree = builder.addTrees(traceTree.tree, commonTree);
          allTrees[traceTree.moduleName] = traceTree;
          return resolve(traceTree);
        });

      }).then(function(tr){
        console.log('we are here!')
        return tr;
      })
    }

    buildDeps(startsrc, 1).then(function(test){
      console.log('waaat')
      console.log(test)
      // build parent
      allTrees.forEach(function(tree){
        builder.buildTree(traceTree.tree, src + '.js', {
          sourceMaps: true
          //minify: true
        });
      })
    });

    // buildDeps('dist/app/app', 1).then(function(tree){
    //   // console.log(tree)
    // });
  });
});


gulp.task('oldTree', ['compile'], function(){

  var routes = require('./src/app/routes.json');

  // inject first
  // routes.unshift({
  //   src: "src/app/app"
  // });

  builder.loadConfig('./system.config.js').then(function(){

    var promises = [];

    var trees = [];
    // generate trees
    routes.forEach(function(t){
      promises.push(new RSVP.Promise(function(resolve, reject) {
        console.log('+ Tracing:', t.src);

        builder.trace(t.src).then(function(traceTree) {
          trees.push({
            src: t.src, 
            tree: traceTree.tree
          });
          resolve();
        });

      }));

    });

    RSVP.all(promises).then(function(){
      console.log(trees);
      var commonTree = trees[0].tree;
      trees.forEach(function(tree, i){
        if (i === 0) {return};
        commonTree = builder.intersectTrees(commonTree, tree.tree);
      })      
      
      builder.buildTree(commonTree, 'dist/common.js', { 
          sourceMaps: true 
          //minify: true
        });

      trees.forEach(function(tree, i){
        trees[i].tree = builder.subtractTrees(tree.tree, commonTree);
        
        console.log('+ Building tree:', tree.src)

        // build the tree
        var src = tree.src.replace('src', 'dist');
        builder.buildTree(tree.tree, src + '.js', { 
          sourceMaps: true 
          //minify: true
        });

      });

    });

  });

});



gulp.task('steal', ['compile'], function(){
  var steal = require('steal-tools');
  steal.build({
    main: 'dist/app/app',
    config: 'system.config.js'
  }, {
    minify: false,
    bundleSteal: false,
    bundle: ['dist/app/login/login', 'dist/app/admin/admin', 'dist/app/dashboard/dashboard', 'dist/app/forms/forms']
  })
});

gulp.task('assetGraph', ['compile'], function(){
  var outRoot = 'app-built';

  new AssetGraph({root: './'})
    .loadAssets(['*.html', '*.js'])
    .queue(systemJsAssetGraph({
      outRoot: 'app-built',
      bundle: true
    }))
    .writeAssetsToDisc({url: /^file:/}, 'app-built')
    .run(function (err) {
      if (err) throw err;
      console.log('Done');
    });

});
