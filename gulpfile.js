'use strict';

var gulp           = require('gulp');
var sass           = require('gulp-sass');
var sourcemaps     = require('gulp-sourcemaps');
var browserSync    = require('browser-sync').create();
var twig           = require('gulp-twig');
var data           = require('gulp-data');
var autoprefixer   = require('gulp-autoprefixer');
var cleanCSS       = require('gulp-clean-css');
var path           = require('path');
var flatten        = require('gulp-flatten');
var logger         = require('gulp-logger');
var mainBowerFiles = require('gulp-main-bower-files');
var fs 			   = require('fs');

gulp.task('serve', ['stylesheets', 'twig', 'public::images', 'public::fonts', 'public::js'], function() {
	browserSync.init({
		server: "./public",
		port: 3010
	});
	gulp.watch('./frontend/stylesheets/**/*.scss', ['stylesheets']);
	gulp.watch('./views/**/*.twig', ['twig']);
	gulp.watch('./fixtures/*.json', ['twig']);
	gulp.watch('./frontend/images', ['public::images']);
	gulp.watch('./frontend/fonts', ['public::fonts']);
	gulp.watch('./frontend/javascripts/**/*.js', ['public::js']);
});

gulp.task('main-bower-files',  function() {
	 return gulp.src('./bower.json')
		.pipe(mainBowerFiles(['**/*.js']))
		.pipe(flatten())
		.pipe(logger())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('public::images', function(){
	return gulp.src(['./frontend/images/*.jpg', './frontend/images/*.png'])
	.pipe(gulp.dest('./public/img'))
	.pipe(logger())
	.pipe(browserSync.stream());
});

gulp.task('public::fonts', function(){
	return gulp.src(['./frontend/fonts/*.eot', './frontend/fonts/*.svg', './frontend/fonts/*.ttf', './frontend/fonts/*.woff'])
	.pipe(gulp.dest('./public/fonts'))
	.pipe(logger())
	.pipe(browserSync.stream());
});

gulp.task('public::js', function(){
	return gulp.src('./frontend/javascripts/*.js')
	.pipe(gulp.dest('./public/js'))
	.pipe(logger())
	.pipe(browserSync.stream());
});

gulp.task('stylesheets', function () {
  return gulp.src('./frontend/stylesheets/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
/*	.pipe(autoprefixer({
		browsers: ['last 30 versions'],
		cascade: false
	}))
	.pipe(cleanCSS({compatibility: 'ie8'}))*/
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./public/css'))
	.pipe(browserSync.stream());
});

gulp.task('default', ['serve', 'main-bower-files']);

gulp.task('twig', function () {
	return gulp.src('./views/pages/*.twig')
	.pipe(data(function(file) {
		return JSON.parse(fs.readFileSync('./fixtures/' + path.basename(file.path, '.twig') + '.json'));
	}))
	.pipe(twig())
	.pipe(gulp.dest('./public'))
	.pipe(browserSync.stream());
});