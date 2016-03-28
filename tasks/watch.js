var gulp = require('gulp');
var paths = require('./paths');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

function changed(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['watch:web']);

gulp.task('watch:web', ['build:web'], function() {
  gulp.watch([paths.js], { interval: 1000, debounceDelay: 500 }, function() {
    global.watch = true;

    runSequence('build:js', function(){
    });
  }).on('change', changed);

  gulp.watch([paths.html], { interval: 1000, debounceDelay: 500 }, function() {
    runSequence('build:html', function(){
    });
  }).on('change', changed);

  gulp.watch([paths.scss], { interval: 1000, debounceDelay: 500 }, function() {
    runSequence('build:sass', function(){
    });
  }).on('change', changed);
});
