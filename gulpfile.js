var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');

gulp.task('browserify', function(){
	var bundler = browserify('./client/main.js');

	var watcher = watchify(bundler);

	return watcher
		.on('update', function(){
			watcher
			.transform(reactify)
			.bundle()
			.on('error', function(err){
				console.log('Error compiling components', err.message);
			})
			.pipe(source('bundle.js'))
			.pipe(gulp.dest('./client/build'));
		})
		.transform(reactify)
		.bundle()
		.on('error', function(err){
			console.log('Error compiling components', err.message);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./client/build/'));
});

gulp.task('develop', function(){
	nodemon({
		script: 'server.js',
		ext: 'html js',
		tasks: ['browserify']
	})
	.on('restart', function(){
		console.log('nodemon restarted!');
	});
});

gulp.task('default', ['develop']);
