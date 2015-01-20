import less from 'bower_components/less/dist/less';

var options = {
  env: "development",
  logLevel: 2,
  async: false,
  fileAsync: false,
  poll: 1000,
  functions: {},
  dumpLineNumbers: "comments",
  relativeUrls: false,
  globalVars: {}
  //rootpath: ":/a.com/"
};

// default optimization value.
options.optimization |= less.optimization;

exports.translate = function(load) {
  var pathParts = (load.address+'').split('/');
    pathParts[pathParts.length - 1] = ''; // Remove filename

  var paths = [];
  if (typeof window !== 'undefined') {
    pathParts = (load.address+'').split('/');
    pathParts[pathParts.length - 1] = ''; // Remove filename
    paths = [pathParts.join('/')];
  }
  return new Promise(function(resolve, reject){
    options.filename = load.address;
    options.paths = [pathParts.join('/')];

    less.render(load.source).then(function (src) { 
        resolve(src.css); 
      }, function(e){ 
        reject(e); 
      });
  });
};

exports.instantiate = function(load) {
  load.metadata.deps = [];
  //load.metadata.execute = function(){
    if(load.source) {
      var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        source = load.source+"/*# sourceURL="+load.address+" */";

      // make source load relative to the current page
      source = source.replace(/url\(['"]?([^'"\)]*)['"]?\)/g, function( whole, part ) {
        return "url(" + steal.joinURIs( load.address, part) + ")";
      });
      style.type = 'text/css';

      if (style.styleSheet){
        style.styleSheet.cssText = source;
      } else {
        style.appendChild(document.createTextNode(source));
      }
      head.appendChild(style);
    }

    return System.newModule({});
  //};
  load.metadata.format = "css";
};

exports.buildType = "css";
