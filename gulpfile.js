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

var compilerOptions = {
  filename: '',
  filenameRelative: '',
  blacklist: [],
  whitelist: [],
  modules: '',
  sourceMap: true,
  sourceMapName: '',
  sourceFileName: '',
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

var jshintConfig = {esnext:true};

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
    /*.pipe(ngHtml2Js({
      moduleName: function (file) {
        console.log(file)
        var path = file.split('/'),
            folder = path[path.length - 2];

        return folder.replace(/-[a-z]/g, function (match) {
          return match.substr(1).toUpperCase();
        });
      }
    }))*/
    .pipe(ngHtml2Js())
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('less', function () {
  return gulp.src(path.less)
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.less'}))
    .pipe(less())
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('es6', function () {
  return gulp.src(path.source)
    .pipe(plumber())
    .pipe(changed(path.output, {extension: '.js'}))
    //.pipe(sourcemaps.init())
    .pipe(to5(assign({}, compilerOptions, {modules:'system'})))
    //.pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('compile', function(callback) {
  return runSequence(
    'clean',
    ['less', 'html', 'es6', 'move'],
    callback
  );
});

gulp.task('lint', function() {
  return gulp.src(path.source)
    .pipe(jshint(jshintConfig))
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

gulp.task('watch', ['serve'], function() {
  var watcher = gulp.watch([path.source, path.html], ['compile']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('tree', ['compile'], function() {

  /*
                app
        -------------------
       /      /      \     \
    admin dashboard forms login
       |  /       \   |   /
      modal         select

  */

  
  var startsrc = 'dist/app/app';
  builder.loadConfig('./system.config.js').then(function(){
    

    var buildDeps = function(src, level){
      builder.trace(src).then(function(traceTree){
        if (src.indexOf('bower_components') == 0) return;
        
        var sources = Object.keys(traceTree.tree);
        console.log('-----------------------------------------------')
        console.log('building source ' + src);
        console.log('level ' + level)
        console.log('dependencies: ');
        console.log(sources)
        
        // sources.forEach(function(source){
        //   if (source === src){
        //     return;
        //   }
        //   buildDeps(source, level + 1);
        // })
        
        // traceTree.forEach(function(subtree){
        //   console.log(subtree.name)
        // })
        // console.log(traceTree);
        
        builder.buildTree(traceTree.tree, src + '.js', { 
          sourceMaps: true 
          //minify: true
        });

        return traceTree;
      });
    }

    var tree = buildDeps(startsrc, 1);
    console.log('done building')
    console.log(tree)


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
})
