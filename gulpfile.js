// grab our packages
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    stylish = require('gulp-jscs-stylish');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function () {
    return gulp.src('app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// configure the jscs task with airbnb preset
gulp.task('jscs', function () {
    return gulp.src('app/**/*.js')
        .pipe(jscs())
        .pipe(stylish());
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
    gulp.watch('app/**/*.js', ['jshint', 'jscs']);
});