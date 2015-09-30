exports.config = {
  seleniumServerJar: './node_modules/gulp-protractor/node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['no-sandbox']
    }
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};