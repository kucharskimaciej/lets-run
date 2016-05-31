const gulp = require('gulp');
const html2js = require('gulp-ng-html2js');
const bowerFiles = require('main-bower-files');
const concat = require('gulp-concat');
const filesort = require('gulp-angular-filesort');
const plumber = require('gulp-plumber');
const filter = require('gulp-filter');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const glob = require('gulp-sass-glob');

const {paths} = require('./config');

const buildTemplates = () =>
    gulp.src(paths.templates)
        .pipe(plumber())
        .pipe(
            html2js({
                moduleName: 'templates',
                declareModule: true
            })
        )
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(paths.build));

const buildVendor = () =>
    gulp.src(bowerFiles())
        .pipe(plumber())
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(paths.build));

const buildApp = () =>
    gulp.src(paths.app)
        .pipe(plumber())
        .pipe(maps.init())
        .pipe(filesort())
        .pipe(concat('bundle.js'))
        .pipe(maps.write())
        .pipe(gulp.dest(paths.build));

const buildStyles = () =>
    gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(maps.init())
        .pipe(glob())
        .pipe(sass())
        .pipe(maps.write())
        .pipe(gulp.dest(paths.build));

const build = () =>
    gulp.src(paths.main)
        .pipe(buildVendor())
        .pipe(buildTemplates())
        .pipe(buildApp())
        .pipe(buildStyles())
        .pipe(gulp.dest(paths.build));

gulp.task('build:templates', buildTemplates);
gulp.task('build:libs', buildVendor);
gulp.task('build:app', buildApp);
gulp.task('build:css', buildStyles);
gulp.task('build', buildStyles);
