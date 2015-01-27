// finds nearest common ancestor for array of nodes;
var nca = function(nodes){
  var result = nodes[0];

  nodes.forEach(function(n, i){
    if (i == 0) return;
    result = commonAncestor(result, n);
  })

  return result;
}

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



module.exports = {
  nca: nca
};
