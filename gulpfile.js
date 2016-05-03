'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var browserSync  = require('browser-sync');
var autoprefixer = require('autoprefixer');
var csso         = require('gulp-csso');


// VARIABLES
var cssSrc = './sass/main.scss';
var cssDest = './css';
var cssSrcCsso = './css/main.css';
var cssDestCsso2 = './_site/css';
var cssWatchSrc = './sass/*.scss';


// SASS
gulp.task('sass', function () {
    return gulp.src(cssSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: ['last 1 versions'], cascade: false }) ]))
        .pipe(gulp.dest(cssDest));
});

// CSSO
gulp.task('csso', ['sass'], function () {
    return gulp.src(cssSrcCsso)
        .pipe(sourcemaps.init())
        .pipe(csso({
            sourceMap: true,
            debug: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssDest))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest(cssDestCsso2));
});

// BROWSERSYNC
gulp.task('browser-sync', ['csso'], function() {
    browserSync({
        proxy: '127.0.0.1:4000'
    });
});

// WATCH
gulp.task('watch', function () {
    gulp.watch(cssWatchSrc, ['csso']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*', '_posts/*'], browserSync.reload);
});

// DEFAULT
gulp.task('default', ['browser-sync', 'watch']);

// PRODUCTION
gulp.task('production', ['csso']);
