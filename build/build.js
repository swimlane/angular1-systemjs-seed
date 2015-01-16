var to5 = require('gulp-6to5');
var builder = require('systemjs-builder');
var RSVP = require('rsvp');

/**
 * Recursively traces all the deps
 */
var traceDeps = function(parents, cb){
  var count = 0, 
    trees = [], 
    trace = function(nodes){
      nodes.forEach(function(node){
        count++;
        builder.trace(node).then(function(tree){
          trees.push(tree);

          var keys = Object.keys(tree.tree);
          if(keys.length){
            var dedeps = [];
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
            trace(dedeps);
          }

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

    traceDeps([config.main], function(main){

      traceDeps(config.bundles, function(bundles){

        // flattens all our deps so we can loop commons together
        // results: http://www.screencast.com/t/bV16I8bc2PF
        debugger;

      });

    });

  });
};

module.exports = {
  build: build
};
