/**
 * shin-lp-sp
 *
 * ** ビルド
 *
 * $ gulp
 *
 * ** ローカルサーバーを立ち上げる
 *
 * $ gulp dev
 *
 * ** sprite
 *
 * $ gulp sprite
 *
 * ** 画像を圧縮
 *
 * $ gulp image
 *
 *
 * ---------------------------------------------------------------------- */

/*
 * init package
 */
var gulp = require('gulp');
var cached = require('gulp-cached');
var runSequence =  require('run-sequence');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var size = require('gulp-size');
var fs = require('fs');
var events = require('events');
events.EventEmitter.defaultMaxListeners = 100;


/*
 * path
 */
var path = {
  src: 'src/',
  tmp: 'tmp/',
  dist: 'dist/',
  html_src: 'src/ejs/',
  css_src: 'src/sass/',
  js_src: 'src/js/',
  img_src: 'src/img/',
  sprite_src: 'src/sprite/',
  sample_src: 'src/sample/',
  guide_src: 'src/styleguide/'
};

/*
 * del
 */
var del = require('del');
gulp.task('del', function () {
  return del(path.dist);
});

/*
 * image optim
 */
var imageOptim = require('gulp-imageoptim');
gulp.task('image', function() {
  return gulp.src(path.img_src + '**/*.{png,jpg}')
    .pipe(imageOptim.optimize())
    .pipe(gulp.dest(path.img_src));
});

/*
 * html
 */
// ejs
var ejs = require('gulp-ejs');
gulp.task('ejs', function() {
  var jsonData = {
    data: {
      genre: JSON.parse(fs.readFileSync('./' + path.html_src + 'data/genre.json'))
    }
  };
  return gulp.src(path.html_src + 'pages/**/*.ejs')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(ejs(
      jsonData,
      {
        ext: '.html'
      }
    ))
    .pipe(gulp.dest(path.dist));
});

/*
 * css
 */
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src(path.css_src + '**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' })
    .on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['ie >= 11', 'Android >= 4.4', 'iOS >= 10']}))
    .pipe(gulp.dest(path.dist + 'css/'));
});

gulp.task('sass:tmp', function () {
  return gulp.src(path.css_src + '**/*.scss')
    .pipe(sass()
    .on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['ie >= 11', 'Android >= 4.4', 'iOS >= 10']}))
    .pipe(gulp.dest(path.tmp + 'css/'));
});

// cssnano
// var cssnano = require('cssnano');
// gulp.task('cssnano', function () {
//   return gulp.src([
//     path.dist + 'css/*.css',
//     '!' + path.dist + 'css/*.min.css'
//   ])
//     .pipe(plumber({
//       errorHandler: notify.onError('<%= error.message %>')
//     }))
//     .pipe(postcss([
//       cssnano()
//     ]))
//     .pipe(rename({
//       extname: '.min.css'
//     }))
//     .pipe(gulp.dest(path.dist + 'css/'))
//     .pipe(size({
//       title: 'size : css'
//     }));
// });

// new:postcss
// gulp.task('postcss', function () {
//   gulp.src(path.css_src + '.css')
//     .pipe(plumber({
//       errorHandler: notify.onError('<%= error.message %>')
//     }))
//     .pipe(postcss([
//       precss(),
//       calc(),
//       autoprefixer({
//         browsers: ['iOS >= 4.3', 'Android >= 2.3'],
//         cascade: false
//       })
//     ]))
//     .pipe(gulp.dest(path.tmp + '/css/'))
//     .pipe(postcss([
//       cssnano({
//         zindex: false
//       })
//     ]))
//     .pipe(rename({
//       extname: '.min.css'
//     }))
//     .pipe(gulp.dest(path.dist + '/css/'))
//     .pipe(size({
//       title: 'size : css'
//     }));
// });

// stylelint
// var stylelint = require('stylelint');
// var reporter = require('postcss-reporter');
// var scss = require('postcss-scss');
// gulp.task('stylelint', function() {
//   return gulp.src(path.css_src + '**/*.css')
//     .pipe(plumber({
//       errorHandler: notify.onError('<%= error.message %>')
//     }))
//     .pipe(postcss([
//       stylelint(),
//       reporter({
//         clearAllMessages: true
//       })
//     ], {syntax: scss}));
// });


/*
 * js
 */
// browserify
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
gulp.task('browserify', function () {
  return browserify({entries: path.js_src + 'lp.js'})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(source('lp.js'))
    .pipe(gulp.dest(path.dist + 'js/'));
});

gulp.task('browserify:transfer', function () {
  return browserify({entries: path.js_src + 'test_transfer.js'})
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(source('test_transfer.js'))
    .pipe(gulp.dest(path.dist + 'js/'));
});

// uglify
var uglify = require('gulp-uglify');

gulp.task('uglify', function () {
  return gulp.src([path.dist + 'js/*.js','!' + path.dist + 'js/*.min.js'])
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(path.dist + 'js/'))
    .pipe(size({
      title: 'size : js'
    }));
});

// copy_lib
gulp.task('copy_lib', function () {
  return gulp.src(path.js_src + 'lib/*.js')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(gulp.dest(path.dist + 'js/'))
    .pipe(size({
      title: 'size : copy_lib'
    }));
});

// eslint
var eslint = require('gulp-eslint');

gulp.task('eslint', function () {
  return gulp.src([
    path.js_src + '**/*.js',
    '!' + path.js_src + 'lib/*.js'
  ])
    .pipe(cached('eslint'))
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(eslint())
    .pipe(eslint.format());
    // .pipe(eslint.failAfterError());
});


/*
 * img
 */
// copy_img
gulp.task('copy_img', function () {
  return gulp.src([
    path.img_src + '**/*.{png,jpg}',
    '!' + path.img_src + 'all/*.{png,jpg}',
    '!' + path.img_src + 'china/*.{png,jpg}',
    '!' + path.img_src + 'm/*.{png,jpg}',
    '!' + path.img_src + 'reserve/**/*.{png,jpg}'
  ])
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(gulp.dest(path.dist + 'img/'))
    .pipe(size({
      title: 'size : copy_img'
    }));
});

// copy_img_all
gulp.task('copy_img_all', function () {
  return gulp.src(path.img_src + 'all/*.{png,jpg}')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(gulp.dest(path.dist + 'all/img/'))
    .pipe(size({
      title: 'size : copy:img [all]'
    }));
});

/*
 * sample
 */
// copy_sample
gulp.task('copy_sample', function () {
  return gulp.src(path.sample_src + '**/*')
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(gulp.dest(path.dist + 'sample/'))
    .pipe(size({
      title: 'size : copy_sample'
    }));
});


/*
 * server
 */
var browserSync = require('browser-sync');
gulp.task('browserSync', function (callback) {
  browserSync({
    port: 8000,
    notify: false,
    server: {
      baseDir: path.dist
    }
  });
  callback()
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});


/*
 * watch
 */
gulp.task('watch', ['browserSync'], function (callback) {
  gulp.watch(path.html_src + '**/*.{ejs,json}', ['build:html']);
  gulp.watch(path.css_src + '**/*.scss', ['build:css']);
  gulp.watch(path.js_src + '**/*.js', ['eslint', 'build:js']);
  gulp.watch(path.img_src + '**/*.{png,jpg}', ['build:img']);
  gulp.watch(path.sample_src + '**/*', ['build:sample']);
  gulp.watch(path.guide_src + '**/*', ['build:guide']);
  gulp.watch(path.dist + '**/*', ['bs-reload']);
  callback()
});


/*
 * task manage
 */
// build:html
gulp.task('build:html', function (callback) {
  runSequence('ejs', callback);
});

// build:css
gulp.task('build:css', function (callback) {
  runSequence('sass', 'sass:tmp', callback);
});

// build:js
gulp.task('build:js', function (callback) {
  runSequence('browserify','browserify:transfer', 'uglify', 'copy_lib', callback);
});

// build:img
gulp.task('build:img', function (callback) {
  runSequence('copy_img', callback);
});

// build:sample
gulp.task('build:sample', function (callback) {
  runSequence('copy_sample', callback);
});

// build
gulp.task('build', function (callback) {
  runSequence('build:html', 'build:css', 'build:js', 'build:img', 'build:sample', callback);
});

// default
gulp.task('default', function (callback) {
  runSequence('build', callback);
});

// dev
gulp.task('dev', function (callback) {
  runSequence('build', 'watch', callback);
});
