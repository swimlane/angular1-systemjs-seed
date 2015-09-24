var gulp = require('gulp');
var karma = require('karma').server;
var protractor = require("gulp-protractor").protractor;
var paths = require('../paths');

gulp.task('test', ['build'], function(done) {
  karma.start({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true
  }, function () {
    done();
  });
});

gulp.task('sauce-test', function() {
  gulp.src(paths.tests)
  .pipe((protractor({
    configFile: 'test/protractor.conf.js'
  }))
  .on('error', function (e) { throw e; })
  .on('end', function() {
    // anything you want to run after the Sauce tests finish
  }));
});
