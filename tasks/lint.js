var gulp = require('gulp');
var eslint = require('gulp-eslint');
var paths = require('./paths');

gulp.task('lint', ['lint:js']);

gulp.task('lint:js', function() {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
