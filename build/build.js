var to5 = require('gulp-6to5');
var builder = require('systemjs-builder');
var RSVP = require('rsvp');


var trace = function(nodes){

  nodes.forEach(function(node){

    builder.trace(node)then(function(tree){
      
      if(tree.deps && tree.deps.length){
        trace(tree.deps);
      }

    });

  });
};


/**
 *
 *  config = {
 *    main: 'app/app.js',
 *    config: systemjs config,
 *    bundles: [ 'form/form', 'login/login' ]
 *  }
 */
var build = function(config){

  builder.loadConfig(config.config).then(function(that){
    debugger;

    trace(config.bundles).then(function(nodes){



    });

    /*var promises = [];

    config.bundles.forEach(function(t){
      promises.push(builder.trace(t));
    });

    RSVP.all(promises).then(function(trees){

      var nodes = [];
      trees.forEach(function(tree){

      });

    });*/

  });
};

module.exports = {
  build: build
};
