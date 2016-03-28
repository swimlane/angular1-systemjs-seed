var gulp = require('gulp');
var paths = require('./paths');
var del = require('del');

gulp.task('clean', ['clean:web']);

gulp.task('clean:web', function(done) {
  del(paths.output).then(function() { done() });
});
