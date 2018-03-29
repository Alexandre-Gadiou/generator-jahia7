'use strict';

var gulp = require('gulp');
var del = require('del');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var ejs = require("gulp-ejs");
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();

 /**
 * Config object
 */
var config = {
  'srcFolder' : './src/main/resources/',
  'htmlFolder' : './src/main/html/',
  'distFolder' : './src/main/html/dist/',
}

gulp.task('clean', function (cb) {
  return del([
      config.distFolder,
      config.srcFolder+'css/theme.css',
      config.srcFolder+'css/theme.min.css',
      config.srcFolder+'javascript/main.js',
      config.srcFolder+'javascript/main.min.js'
    ], cb);
});

gulp.task('clean:html', function () {
  return del(config.distFolder+'*.html');
});

gulp.task('clean:images', function () {
  return del(config.distFolder+'images/**/*');
});

gulp.task('clean:fonts', function () {
  return del(config.distFolder+'fonts/**/*');
});

gulp.task('clean:vendor', function () {
  return del(config.distFolder+'vendor/**/*');
});

gulp.task('ejs', function() {
  return gulp.src(config.htmlFolder+"pages/*.ejs")
    .pipe(ejs({
        msg: "Building html static pages"
    }))
    .pipe(rename({extname: '.html'}))
    .pipe(gulp.dest(config.distFolder));
});

gulp.task('sass', function () {
  return gulp.src(config.srcFolder+'sass/theme.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.srcFolder+'css/'));
});

gulp.task('cssmin', function() {
  return gulp.src(config.srcFolder+'css/theme.css')
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.srcFolder+'css/'));
});

gulp.task('jsmin', function() {
  return gulp.src(config.srcFolder+'javascript/main.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.srcFolder+'javascript/'));
});

gulp.task('browserify', function() {
    return browserify(config.srcFolder+'javascript/app.js')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.srcFolder+'javascript/'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: config.distFolder,
            index: "index.html"
        }
    });

    watch(config.htmlFolder+'components/**/*.ejs', gulp.series('buildHTML'));
    watch(config.htmlFolder+'content/**/*.ejs', gulp.series('buildHTML'));
    watch(config.htmlFolder+'layouts/**/*.ejs', gulp.series('buildHTML'));
    watch(config.htmlFolder+'pages/**/*.ejs', gulp.series('buildHTML'));
    watch(config.htmlFolder+'partials/**/*.ejs', gulp.series('buildHTML'));
    watch(config.srcFolder+'sass/**/*.scss', gulp.series('buildCSS'));
    watch([config.srcFolder+'javascript/**/*.js','!'+config.srcFolder+'javascript/main.js','!'+config.srcFolder+'javascript/main.min.js'], gulp.series('buildJS'));
    watch(config.srcFolder+'images/**/*', gulp.series('buildImages',browserSync.reload));
    watch(config.srcFolder+'fonts/**/*', gulp.series('buildFonts',browserSync.reload));
    watch(config.srcFolder+'vendor/**/*', gulp.series('buildVendor',browserSync.reload));

    gulp.watch(config.distFolder+"*.html").on('change', browserSync.reload);
    gulp.watch(config.distFolder+"css/**/*.css").on('change', browserSync.reload);
    gulp.watch(config.distFolder+"javascript/**/*.js").on('change', browserSync.reload);

});


gulp.task('copy:css', function() {
  return gulp.src(config.srcFolder+'css/**/*.*')
    .pipe(gulp.dest(config.distFolder+'css/'));
});

gulp.task('copy:javascript', function() {
  return gulp.src(config.srcFolder+'javascript/**/*.*')
    .pipe(gulp.dest(config.distFolder+'javascript/'));
});

gulp.task('copy:images', function() {
  return gulp.src(config.srcFolder+'images/**/*.*')
    .pipe(gulp.dest(config.distFolder+'images/'));
});

gulp.task('copy:fonts', function() {
  return gulp.src(config.srcFolder+'fonts/**/*.*')
    .pipe(gulp.dest(config.distFolder+'fonts/'));
});

gulp.task('copy:vendorJquery', function() {
   return gulp.src('./node_modules/jquery/**/*').pipe(gulp.dest(config.srcFolder+'vendor/jquery'));
});
gulp.task('copy:vendorBootstrap', function() {
   return gulp.src('./node_modules/bootstrap/**/*').pipe(gulp.dest(config.srcFolder+'vendor/bootstrap'));
});

gulp.task('copy:vendorTether', function() {
   return gulp.src('./node_modules/tether/**/*').pipe(gulp.dest(config.srcFolder+'vendor/tether'));
});

gulp.task('copy:vendorFontAwesome', function() {
   return gulp.src('./node_modules/font-awesome-sass/**/*').pipe(gulp.dest(config.srcFolder+'vendor/font-awesome'));
});

gulp.task('copy:vendorDependencies', gulp.parallel('copy:vendorJquery','copy:vendorBootstrap','copy:vendorTether','copy:vendorFontAwesome'));

gulp.task('copy:vendorAssets', function() {
  return gulp.src(config.srcFolder+'vendor/**/*.*')
    .pipe(gulp.dest(config.distFolder+'vendor/'));
});

gulp.task('buildHTML', gulp.series('clean:html','ejs'));
gulp.task('buildCSS', gulp.series('sass','copy:css'));
gulp.task('buildJS', gulp.series('browserify','copy:javascript'));
gulp.task('buildImages', gulp.series('clean:images','copy:images'));
gulp.task('buildFonts', gulp.series('clean:fonts','copy:fonts'));
gulp.task('buildVendor', gulp.series('clean:vendor','copy:vendorDependencies','copy:vendorAssets'));

gulp.task('build', gulp.series('clean','buildVendor', 'buildFonts', 'buildImages', 'buildCSS', 'buildJS', 'buildHTML'));
gulp.task('default', gulp.series('build', 'browser-sync'));
gulp.task('release', gulp.series('build','cssmin','jsmin'));