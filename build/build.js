var to5 = require('gulp-6to5');
var builder = require('systemjs-builder');
var RSVP = require('rsvp');


/**
 * Given a tree, get the child deps.
 */
var getChildren = function(tree, trees){
  var keys = Object.keys(tree.tree), 
      dedeps = [];

  if(keys.length){
    keys.forEach(function(k){
      var name = tree.tree[k].name;

      // bug or something, dedups itself somtimes
      if(name === tree.moduleName) {
        delete tree.tree[name];
        return;
      }

      // find unique modules only ....
      if(!trees.find(function(t){ return t.moduleName === name; })){
        dedeps.push(name);
      }
    });
  }

  return dedeps;
};


/**
 * Recursively traces all the deps
 */
var traceDeps = function(parents, cb){
  var count = 0,
    trees = [],
    trace = function(nodes, bundleName){
      nodes.forEach(function(node){
        count++;
        builder.trace(node).then(function(tree){

          // if we don't have a bundle name,
          // its the top level one
          if(bundleName === undefined) {
            tree.bundle = tree.moduleName;
          } else {
            tree.bundle = bundleName;
          }

          trees.push(tree);
          var children = getChildren(tree, trees);
          if (children.length) trace(children, tree.bundle);

          count--;
          if (count === 0) cb(trees);
        });
      });
    };
  trace(parents);
};

/**
 *  config = {
 *    main: 'app/app.js',
 *    config: systemjs config,
 *    bundles: [ 'form/form', 'login/login' ]
 *  }
 */
var build = function(config){

  builder.loadConfig(config.config).then(function(that){

    traceDeps([config.main], function(mainBundle){

      traceDeps(config.bundles, function(bundles){

        // flattens all our deps so we can loop commons together
        // results: http://www.screencast.com/t/bV16I8bc2PF
        // bundles = [ { moduleName, tree, bundle } ]
        // todo: subtract main module deps from bundle sets...

      });

    });

  });
};

module.exports = {
  build: build
};
