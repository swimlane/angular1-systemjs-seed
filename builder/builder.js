var gulp = require('gulp');
var treeWalker = require('./tree-walker');
var builder = require('systemjs-builder');
var RSVP = require('rsvp');
var insert = require('gulp-insert');

var appTree;
var routeTrees = [];
var promises = [];
var treeCache = {};

var build = function(config){
  console.log('tracing source files...')
  return treeWalker.getTrees({
      main: config.main,
      config: config.config
  }, treeCache).then(function (tree) {
      appTree = tree;

      config.routes.forEach(function (route) {
        promises.push(new RSVP.Promise(function (resolve, reject) {
          treeWalker.getTrees({
            main: route,
            config: './system.config.js'
          }, treeCache).then(function (tree) {
            routeTrees.push(tree);
            resolve();
          });
        }));
      })

      return RSVP.all(promises).then(function () {
        // Remove app tree dependencies from route trees;
        removeDepsFromRoutes();

        // generate inverse index of dependencies
        var inverseIndex = generateInverseIndex();
        // generate bundles
        console.log('generating bundles...')
        var bundles = generateBundles(inverseIndex, config.bundleThreshold);
        // build trees
        console.log('building...')
        return buildTrees(bundles, config);
    });
  });
}

var removeDepsFromRoutes = function(){
  Object.keys(appTree).forEach(function (moduleName) {
    routeTrees.forEach(function (treeIndex) {
      if (treeIndex[moduleName]) {
        // deleting the dep tree
        delete treeIndex[moduleName];
        // removing dep from the other trees
        Object.keys(treeIndex).forEach(function (depName) {
          treeIndex[depName].tree = builder.subtractTrees(treeIndex[depName].tree, appTree[moduleName].tree);
        });
      }
    });
  });
}

var generateInverseIndex = function(){
  var inverseIndex = {};
  routeTrees.forEach(function (treeIndex, i) {
    Object.keys(treeIndex).forEach(function (depName) {
      if (inverseIndex[depName] === undefined) {
        inverseIndex[depName] = [i];
      } else {
        inverseIndex[depName].push(i);
      }
    });
  });
  return inverseIndex;
}

var generateBundles = function(inverseIndex, bundleThreshold){
  var bundles = {};
  // generating bundles
  Object.keys(inverseIndex).forEach(function (moduleName) {
    // if it's included in only one route, leave it there
    if (inverseIndex[moduleName].length == 1) {
      return;
    }

    var module = routeTrees[inverseIndex[moduleName][0]][moduleName];
    if (inverseIndex[moduleName].length / routeTrees.length >= bundleThreshold) {
      // if it's included in more than the threshold of the routes, put it in app
      //console.log('shared by more than ' + (bundleThreshold*100) + '% of routes - including in app');
      appTree['app/app'].tree = builder.addTrees(appTree['app/app'].tree, module.tree);
      appTree[moduleName] = module;

    } else {
      // otherwise, put it in a bundle
      var bundleName = inverseIndex[moduleName].sort().join('-');
      if (bundles[bundleName] === undefined) {
        bundles[bundleName] = module;
      } else {
        bundles[bundleName].tree = builder.addTrees(bundles[bundleName].tree, module.tree);
      }
    }

    // remove from other trees;
    inverseIndex[moduleName].forEach(function (index) {
      var treeIndex = routeTrees[index];
      delete treeIndex[moduleName];

      Object.keys(treeIndex).forEach(function (depName) {
        treeIndex[depName].tree = builder.subtractTrees(treeIndex[depName].tree, module.tree);
      });

    })
  });
  return bundles;
}

var buildTrees = function(bundles, config){
  // build bundles
  var bundlesConfig = {};
  console.log('building bundles...')
  Object.keys(bundles).forEach(function (bundleName) {
    buildTree(bundles[bundleName], "bundles/" + bundleName, config);
    bundlesConfig["bundles/" + bundleName] = Object.keys(bundles[bundleName].tree);
  });
  // build route trees
  console.log('building routes...')
  routeTrees.forEach(function (treeIndex) {
    Object.keys(treeIndex).forEach(function (moduleName) {
      buildTree(treeIndex[moduleName], moduleName, config);
    });
  });
  // build root app
  console.log('building app...')
  return Object.keys(appTree).forEach(function (moduleName) {
    buildTree(appTree[moduleName], moduleName, config).then(function () {
      if (moduleName === 'app/app') {
        var bundlesString = "System.bundles = " + JSON.stringify(bundlesConfig, null, 4) + ";";

        return gulp.src('dist/app/app.js')
          .pipe(insert.prepend(bundlesString))
          .pipe(gulp.dest('dist/app'));
      }
    })
  });
}

var buildTree = function (tree, destination, config) {
  //if (destination.indexOf('bower_components') != 0) {
    return builder.buildTree(tree.tree, 'dist/' + destination + '.js', {
      sourceMaps: config.sourceMaps,
      minify: config.minify
    })
  //}
}

module.exports = {
  build: build
};
