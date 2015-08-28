var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('browserify', js)
		.task('develop',develop);

var bundler = browserify('./client/main.js');
var watcher = watchify(bundler);

watcher.transform(reactify);

watcher.on('update', js);

function js() {
	return watcher
		.bundle()
		.on('error', function(err){
			console.log('Error compiling components', err.message);
		})
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest('./client/build/'));
}

function develop(){
	nodemon({
		script: 'server.js',
		ext: 'html js',
	});
}

gulp.task('default', ['develop', 'browserify']);
