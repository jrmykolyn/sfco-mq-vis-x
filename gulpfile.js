// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const browserify = require( 'gulp-browserify' );
const PathMap = require( 'sfco-path-map' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const PATHS = new PathMap( {
	src: './src',
	srcStyles: '{{src}}/styles',
	srcScripts: '{{src}}/scripts',
	dist: './dist',
	distCss: '{{dist}}/css',
	distJs: '{{dist}}/js'
} );

// --------------------------------------------------
// DEFINE TASKS
// --------------------------------------------------
gulp.task( 'default', [ 'scripts', 'styles', 'watch' ] );

gulp.task( 'scripts', function() {
	return gulp.src( `${PATHS.srcScripts}/**/*.js` )
		.pipe( browserify() )
		.pipe( gulp.dest( PATHS.distJs ) );
} );

gulp.task( 'styles', function() {
	return gulp.src( `${PATHS.srcStyles}/styles.scss` )
		.pipe( sass() )
		.pipe( gulp.dest( PATHS.distCss ) );
} );

gulp.task( 'watch', function() {
	gulp.watch( `${PATHS.srcScripts}/**/*.js`, [ 'scripts' ] );
	gulp.watch( `${PATHS.srcStyles}/**/*.scss`, [ 'styles' ] );
} );
