let gulp = require('gulp');
let sass = require('gulp-sass');
let nodemon = require('gulp-nodemon');

gulp.task('sass', function () {
	return gulp.src('public/stylesheets/style.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('public/stylesheets/'));
});

// List all tasks that should be done on restart
gulp.task('watch', ['sass']);

gulp.task('nodemon', function () {
	return nodemon({
		script: 'bin/www',
		'ignore': ['public/vendors']
	})
		.on('start', ['watch'])
		.on('change', ['watch'])
		.on('restart', function () {
			console.log('=========================');
			console.log('=== Gulp is restarted ===');
			console.log('=========================');
		})
});
