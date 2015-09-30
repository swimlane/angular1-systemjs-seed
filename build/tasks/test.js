var gulp = require('gulp');
var karma = require('karma').server;
var gulp_protractor = require("gulp-protractor");
var paths = require('../paths');

gulp.task('test', ['build'], function(done) {
  karma.start({
    configFile: __dirname + '/../../karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('sauce-test', function(done) {
  gulp.src(paths.tests)
  .pipe((gulp_protractor.protractor({
    configFile: __dirname + '/../../protractor.conf.js'
  }))
  .on('error', function (e) { throw e; })
  .on('end', done));
});

gulp.task('webdriver-update', gulp_protractor.webdriver_update);
gulp.task('webdriver-standalone', ['webdriver-update'], gulp_protractor.webdriver_standalone);