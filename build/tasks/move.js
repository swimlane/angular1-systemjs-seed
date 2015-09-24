var gulp = require('gulp');
var paths = require('../paths');

gulp.task('move', function () {
  var srcPaths = [
    './src/**/*.json',
    './src/**/*.svg',
    './src/**/*.woff',
    './src/**/*.ttf',
    './src/**/*.png',
    './src/**/*.ico',
    './src/**/*.jpg',
    './src/**/*.gif',
    './src/**/*.eot'
  ];

  return gulp.src(srcPaths)
    .pipe(gulp.dest(paths.output))
});
