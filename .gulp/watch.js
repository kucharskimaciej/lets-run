const gulp = require('gulp');
const watch = require('gulp-watch');

const {paths} = require('./config');

gulp.task('watch', () => {
    gulp.start('build');

    watch([paths.bowerfile, paths.vendor], function () {
        gulp.start('build:libs');
    });
    watch([paths.app], function () {
        gulp.start('build:app');
    });
    watch(paths.templates, function () {
        gulp.start('build:templates');
    });

    watch(paths.styles, function () {
        gulp.start('build:css');
    });
});
