const gulp    = require('gulp');
const include = require('gulp-include');
const eslint  = require('gulp-eslint');
const isFixed = require('gulp-eslint-if-fixed');
const babel   = require('gulp-babel');
const readme  = require('gulp-readme-to-markdown');
const rename  = require('gulp-rename');
const uglify  = require('gulp-uglify');


const config = {
  src: {
    jsPath: './src/js'
  },
  dist: {
    jsPath: './static/js'
  }
};

//
// Helper Functions
//

// Base JS linting function (with eslint). Fixes problems in-place.
function lintJS(src, dest) {
  dest = dest || config.src.jsPath;

  return gulp.src(src)
    .pipe(eslint({
      fix: true
    }))
    .pipe(eslint.format())
    .pipe(isFixed(dest));
}

// Base JS compile function
function buildJS(src, dest) {
  dest = dest || config.dist.jsPath;

  return gulp.src(src)
    .pipe(include({
      includePaths: [config.src.jsPath]
    }))
    .on('error', console.log) // eslint-disable-line no-console
    .pipe(babel())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(dest));
}

//
// JavaScript
//

// Run eslint on js files in config.src.jsPath
gulp.task('es-lint-plugin', () => {
  return lintJS([`${config.src.jsPath}/*.js`], config.src.jsPath);
});

// Concat and uglify js files through babel
gulp.task('js-build-plugin', () => {
  return buildJS(`${config.src.jsPath}/script.js`, config.dist.jsPath);
});

// All js-related tasks
gulp.task('js', gulp.series('es-lint-plugin', 'js-build-plugin'));

//
// Documentation
//

gulp.task('readme', () => {
  return gulp.src('readme.txt')
    .pipe(readme({
      details: false,
      screenshot_ext: [] // eslint-disable-line camelcase
    }))
    .pipe(gulp.dest('.'));
});

//
// Rerun tasks when files change
//
gulp.task('watch', () => {
  gulp.watch(`${config.src.jsPath}/**/*.js`, gulp.series('js'));
});

//
// Default task
//
gulp.task('default', gulp.series('js', 'readme'));
