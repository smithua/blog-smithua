'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var csso         = require('gulp-csso');
var runSequence  = require('run-sequence');
runSequence = require('run-sequence').use(gulp);


// VARIABLES
var cssSrc = './sass/main.scss';
var cssDest = './css';
var cssDestCsso = './css/main.css';


// TASKS
gulp.task('sass', function () {
  return gulp.src(cssSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['last 1 versions'], cascade: false }) ]))
    .pipe(gulp.dest(cssDest));
});


// CSSO
gulp.task('csso', function () {
    return gulp.src(cssDestCsso)
        .pipe(sourcemaps.init())
        .pipe(csso({
            sourceMap: true,
            debug: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(cssDest));
});

gulp.task('default', function () {
    runSequence('sass', 'csso');
});

// gulp.task('development', function () {
//     return gulp.src('./main.css')
//         .pipe(csso({
//             restructure: false,
//             sourceMap: true,
//             debug: true
//         }))
//         .pipe(gulp.dest('./out'));
// });


// gulp.task('sass:watch', function () {
//   gulp.watch(cssSrc, ['sass']);
// });
