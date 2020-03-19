'use strict';

const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require("gulp-rename")
const browsersync = require('browser-sync')
const vf = require('vinyl-file')
const vss = require('vinyl-source-stream')
const vb = require('vinyl-buffer')

const compile_sass = (source, dest, min = false, done = ()=>{}) => {
	if(min){
		gulp.src(source)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(rename({
			suffix: ".min",	
		}))
		.pipe(gulp.dest(dest));
	}else{
		gulp.src(source)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(dest));
	}
	
	done();
}

gulp.task('compile-sass', function (done) {
	compile_sass('./assets/sass/main.scss', './assets/css', true, done);
});


gulp.task('default', function (done) {
	gulp.watch(['./assets/sass/*.scss'], gulp.series(['compile-sass']));

	const server = browsersync.create();
	server.init({
		proxy: "music-player.naz",
		port:3000,
		uiPort:3001,
		injectChanges: true,
		ghostMode: false,
		files: [
		"./assets/css/main.min.css",
		"./assets/js/*.*",
		"./index.php"
		]
	});
	done();
});