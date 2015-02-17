// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
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
    reporters: ['progress', 'coverage'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // list of files / patterns to load in the browser
    files: [],

    jspm: {
      config: './system.config.js',
      loadFiles: ['test/**/*.spec.js'],
      serveFiles: [
        'dist/**/*.js',
        'dist/**/*.css',
        'bower_components/**/*.js',
        'bower_components/**/*.css',
        'node_modules/chai/**/*.js'
      ]
    },

    proxies: {
      '/base/app/': '/base/dist/app/',
      '/base/common/': '/base/dist/common/',
      '/bower_components/': '/base/bower_components/',
      '/base/dist/test/': '/base/test/',
      '/base/dist/node_modules/': '/base/node_modules/'
    },

    // list of files to exclude
    exclude: [],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'dist/**/*.js': ['coverage']
      //'src/**/*.js': ['6to5']
    },

    /*'6to5Preprocessor': {
      options: {
        sourceMap: 'inline',
        modules: 'system',
        moduleIds: false
      }
    }*/

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }

  });
};
