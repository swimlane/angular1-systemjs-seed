var to5 = require('gulp-6to5');
var builder = require('systemjs-builder');
var RSVP = require('rsvp');

var build = function(config){
  return builder.loadConfig(config.config).then(function(){
    var inverseIndex = {};

    var treeIndex = {};
    var trees = [];
    var buildDeps = function(src, level){
      // trace source to get dependency tree
      return builder.trace(src).then(function(traceTree){

        var found = trees.filter(function(el){
          return el.moduleName == traceTree.moduleName;
        });

        if (found.length == 0){
          trees.push(traceTree);
          treeIndex[traceTree.moduleName] = traceTree;
        }

        // extract dependency source paths
        var sources = Object.keys(traceTree.tree);
        // process each dependency individually, and collect their trees
        var subTrees = [];
        var promises = [];
        sources.forEach(function(source){
          // if (source === src || source.indexOf('bower_components') == 0 || source.indexOf('tpl') != -1){
          if (source === src){
            return;
          }

          if (inverseIndex[source]){
            if (inverseIndex[source].indexOf(traceTree) == -1) {
              inverseIndex[source].push(traceTree);
            }
          } else {
            inverseIndex[source] = [traceTree];
          }

          promises.push(new RSVP.Promise(function(resolve, reject) {
            buildDeps(source, level + 1).then(function(subTree){
              subTrees.push(subTree);
              resolve();
            });
          }));
        })

        return RSVP.all(promises).then(function(){
          traceTree.children = subTrees;

          subTrees.forEach(function(subTree){
            subTree.parent = traceTree;
          })
          return traceTree;
        });

      })
    }

    return buildDeps(config.main, 1).then(function(tree){
      return inverseIndex;
    });
  });
}


module.exports = {
  build: build
};
