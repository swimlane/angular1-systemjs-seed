var to5 = require('gulp-6to5');
var builder = require('systemjs-builder');
var RSVP = require('rsvp');

var build = function(config){
  return builder.loadConfig(config.config).then(function(){

    var inverseIndex = {};

    var treeIndex = {};
    var trees = [];

    // returns array of parents of a node. root is first
    function parents(node) {
      var nodes = [];
      for (; node; node = node.parent) {
        nodes.unshift(node)
      }
      return nodes;
    }

    // returns nearest common ancestor for two nodes
    function commonAncestor(node1, node2) {
      var parents1 = parents(node1)
      var parents2 = parents(node2)

      if (parents1[0].moduleName != parents2[0].moduleName) throw "No common ancestor!"

      for (var i = 0; i < parents1.length; i++) {
        if (parents2[i] === undefined){
          return parents1[i - 1];
        }
        if (parents1[i].moduleName != parents2[i].moduleName) return parents1[i - 1];
      }

      return parents1[i - 1];
    }

    // finds nearest common ancestor for array of nodes;
    var nca = function(nodes){
      var result = nodes[0];

      nodes.forEach(function(n, i){
        if (i == 0) return;
        result = commonAncestor(result, n);
      })

      return result;
    }

    var buildDeps = function(src, level){
      console.log('start ' + src)
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

        // if root, add the routes as dependencies
        if (level === 1){
          sources = sources.concat(config.bundles);
        }



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
          console.log('end ' + src)
          return traceTree;
        });

      })
    }

    return buildDeps(config.main, 1).then(function(tree){
      console.log('build finished')
      Object.keys(inverseIndex).forEach(function(depName){
        depTree = treeIndex[depName];

        console.log("=================================================================")
        console.log('finding lowest common ancestor for ' + depName);
        console.log('parents:')
        inverseIndex[depName].forEach(function(n){
          console.log(n.moduleName);
        })
        var commonAncestor = nca(inverseIndex[depName]);
        console.log('common ancestor: -------------------------------')
        console.log(commonAncestor.moduleName);

        commonAncestor.tree = builder.addTrees(commonAncestor.tree, depTree.tree);

        inverseIndex[depName].forEach(function(n){
          if (n.moduleName === depTree.moduleName || n.moduleName === commonAncestor.moduleName){
            return;
          }
          n.tree = builder.subtractTrees(n.tree, depTree.tree);
        })

      })

      config.bundles.forEach(function(routeName){
        var routeTree = treeIndex[routeName];
        tree.tree = builder.subtractTrees(tree.tree, routeTree.tree)
      })

      trees.forEach(function(t){
        if (t.moduleName.indexOf('bower_components') != 0){
          builder.buildTree(t.tree, 'dist/' + t.moduleName + '.js', {
            sourceMaps: true
            //minify: true
          });
        }
      })


      return inverseIndex;
    });
  });
}


module.exports = {
  build: build
};
