SystemJS.config({
  transpiler: "plugin-babel",
  babelOptions: {
    "optional": [
      "runtime"
    ]
  },
  baseURL: "",
  paths: {
    "*": "dist/*",
    "app/*": "dist/app/*",
    "assets/*": "dist/assets/*",
    "bundles/*": "dist/bundles/*",
    "common/*": "dist/common/*",
    "github:*": "jspm_packages/github/*",
    "jspm_packages/*": "jspm_packages/*",
    "lib/*": "lib/*",
    "npm:*": "jspm_packages/npm/*",
    "systemjs-test/*": "src/*",
    "systemjs-seed/": "src/"
  },
  buildCSS: true,
  separateCSS: false,
  meta: {
    "github:angular/bower-angular-mocks@1.3.15/angular-mocks.js": {
      "deps": [
        "angular"
      ]
    },
    "github:angular-ui/ui-router@0.2.13/angular-ui-router.js": {
      "deps": [
        "angular"
      ]
    },
    "github:ocombe/ocLazyLoad@0.5.2/dist/ocLazyLoad.js": {
      "deps": [
        "angular"
      ]
    },
    "npm:ui-router-extras@0.0.13/release/modular/ct-ui-router-extras.core.js": {
      "format": "global",
      "deps": [
        "angular"
      ]
    },
    "npm:ui-router-extras@0.0.13/release/modular/ct-ui-router-extras.future.js": {
      "format": "global",
      "deps": [
        "npm:ui-router-extras@0.0.13/release/modular/ct-ui-router-extras.core.js"
      ]
    }
  },
  packages: {
    "systemjs-seed": {
      "main": "app.js"
    }
  },
  map: {
    "Swimlane/ui-router-extras": "github:Swimlane/ui-router-extras@master",
    "ocombe/ocLazyLoad": "github:ocombe/ocLazyLoad@0.5.2"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "angular": "npm:angular@1.5.2",
    "babel-polyfill": "npm:babel-polyfill@6.7.4",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.15",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.15",
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "babel-runtime": "npm:babel-runtime@5.8.25",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "child_process": "github:jspm/nodelibs-child_process@0.2.0-alpha",
    "clean-css": "npm:clean-css@3.4.4",
    "core-js": "npm:core-js@1.1.4",
    "css": "github:systemjs/plugin-css@0.1.17",
    "events": "github:jspm/nodelibs-events@0.2.0-alpha",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "http": "github:jspm/nodelibs-http@0.2.0-alpha",
    "https": "github:jspm/nodelibs-https@0.2.0-alpha",
    "json": "github:systemjs/plugin-json@0.1.0",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "ocLazyLoad": "github:ocombe/ocLazyLoad@0.5.2",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-babel": "npm:systemjs-plugin-babel@0.0.8",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "stream": "github:jspm/nodelibs-stream@0.2.0-alpha",
    "ui-router-extras": "github:Swimlane/ui-router-extras@master",
    "url": "github:jspm/nodelibs-url@0.2.0-alpha",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha"
  },
  packages: {
    "npm:babel-polyfill@6.7.4": {
      "map": {
        "babel-regenerator-runtime": "npm:babel-regenerator-runtime@6.5.0",
        "babel-runtime": "npm:babel-runtime@5.8.25",
        "core-js": "npm:core-js@2.2.1"
      }
    },
    "github:angular-ui/ui-router@0.2.15": {
      "map": {
        "angular": "github:angular/bower-angular@1.4.6"
      }
    },
    "github:angular/bower-angular-mocks@1.3.15": {
      "map": {
        "angular": "github:angular/bower-angular@1.4.6"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.5.1"
      }
    },
    "github:jspm/nodelibs-http@0.2.0-alpha": {
      "map": {
        "http-browserify": "npm:stream-http@2.2.1"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.0"
      }
    },
    "github:jspm/nodelibs-stream@0.2.0-alpha": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.1"
      }
    },
    "github:jspm/nodelibs-url@0.2.0-alpha": {
      "map": {
        "url-browserify": "npm:url@0.11.0"
      }
    },
    "npm:amdefine@1.0.0": {
      "map": {}
    },
    "npm:babel-runtime@5.8.25": {
      "map": {}
    },
    "npm:buffer@4.5.1": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:clean-css@3.4.4": {
      "map": {
        "commander": "npm:commander@2.8.1",
        "source-map": "npm:source-map@0.4.4"
      }
    },
    "npm:commander@2.8.1": {
      "map": {
        "graceful-readlink": "npm:graceful-readlink@1.0.1"
      }
    },
    "npm:core-js@1.1.4": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.0"
      }
    },
    "npm:core-util-is@1.0.1": {
      "map": {}
    },
    "npm:graceful-readlink@1.0.1": {
      "map": {}
    },
    "npm:inherits@2.0.1": {
      "map": {}
    },
    "npm:punycode@1.3.2": {
      "map": {}
    },
    "npm:readable-stream@2.0.6": {
      "map": {
        "core-util-is": "npm:core-util-is@1.0.1",
        "inherits": "npm:inherits@2.0.1",
        "isarray": "npm:isarray@1.0.0",
        "process-nextick-args": "npm:process-nextick-args@1.0.6",
        "string_decoder": "npm:string_decoder@0.10.31",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:source-map@0.4.4": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:stream-browserify@2.0.1": {
      "map": {
        "inherits": "npm:inherits@2.0.1",
        "readable-stream": "npm:readable-stream@2.0.6"
      }
    },
    "npm:stream-http@2.2.1": {
      "map": {
        "builtin-status-codes": "npm:builtin-status-codes@2.0.0",
        "inherits": "npm:inherits@2.0.1",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "xtend": "npm:xtend@4.0.1"
      }
    },
    "npm:string_decoder@0.10.31": {
      "map": {}
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    }
  }
});
