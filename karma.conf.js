// Karma configuration

module.exports = function(config) {
  config.set({

    // // base path that will be used to resolve all patterns (eg. files, exclude)
    //basePath: './src',
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jspm', 'jasmine'],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // list of files / patterns to load in the browser
    files: [
      //'jspm_packages/es6-module-loader.src.js',
      //'jspm_packages/system.src.js',
      //'system.config.js'

      // Serve but don't create script tags for any files being `import`ed
      //{ pattern: '**/*.js', included: false },
      //{ pattern: '**/*.html', included: false },
      //{ pattern: '**/*.json', included: false }

      //'../config/traceur-runtime-patch.js',
      //'../config/file-name-to-module-name.js',

      // Load and initialize all spec files using SystemJS
      //'../karma-spec-loader.config.js',
    ],

    jspm: {
      // Edit this to your needs
      loadFiles: ['dist/**/*.js', 'test/**/*.js']
    },

    // list of files to exclude
    exclude: [
      'src/**'
      //'bower_components/**',
      //'jspm_modules/**',
      //'node_modules/**'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['6to5']
    },

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO

    /*'6to5Preprocessor': {
      options: {
        sourceMap: 'inline',
        modules: 'system',
        moduleIds: false
      }
    },*/

    // optionally, configure the reporter
    /*coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }*/

  });
};
