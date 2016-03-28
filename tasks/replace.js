var gulp = require('gulp');
var replace = require('gulp-replace-task');

gulp.task('replace', function() {
  return gulp.src('wwwroot/index.html')
    .pipe(replace({
      usePrefix: false,
      patterns: [
        {
          match: '<script src="jspm_packages/system.js"></script>',
          replacement: '<!-- <script src="jspm_packages/system.js"></script> -->',
        },
        {
          match: '<script src="jspm.browser.js"></script>',
          replacement: '<!-- <script src="jspm.browser.js"></script> -->',
        },
        {
          match: '<script src="jspm.config.js"></script>',
          replacement: '<!-- <script src="jspm.config.js"></script> -->',
        },
        {
          match: '<!-- <script src="dist/app/app.js?bust={{date}}"></script> -->',
          replacement: '<script src="dist/app/app.js?bust={{date}}"></script>',
        },
        {
          match: '{{date}}',
          replacement: Math.round(new Date() / 1000),
        },
      ],
    }))
    .pipe(gulp.dest());
});
