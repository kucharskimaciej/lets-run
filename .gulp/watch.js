const gulp = require('gulp');
const watch = require('gulp-watch');

const {paths} = require('./config');

gulp.task('watch', () => {
    watch(paths.vendor, function () {
        gulp.start('build-vendor');
    });
    watch([paths.app], function () {
        gulp.start('build');
    });
    watch(paths.templates, function () {
        gulp.start('build-templates');
    });

    watch(paths.styles, function () {
        gulp.start('build-styles');
    });
});