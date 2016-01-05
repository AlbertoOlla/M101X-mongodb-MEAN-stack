var gulp = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('test', function() {
  gulp.
    src('./test.js').
    pipe(mocha()).
    on('error', function(err) {
      this.emit('end');
    });
});

gulp.task('watch', function() {
  gulp.watch('./*.js', ['test']);
});
