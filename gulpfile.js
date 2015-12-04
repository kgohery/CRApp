var gulp = require('gulp'),
	args = require('yargs').argv,
	config = require('./gulp.config')(),
	del = require('del'),
	wiredep = require('wiredep').stream,
	
	$ = require('gulp-load-plugins')({ lazy: true });
	
	

gulp.task('default', ['help']);

gulp.task('help', $.taskListing );

gulp.task('validate', function () {
	
	log('Analysing code with JSHint and JSCS');
	
	return gulp
		.src(config.alljs)
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs('.jscsrc'))
		.pipe($.jscsStylish())
		.pipe($.jshint('.jshintrc'))
		.pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
		.pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function () {
	
	log('Compiling LESS to CSS');
	
	return gulp
		.src(config.lessMainFile)
		.pipe($.plumber())
		.pipe($.less())
		.pipe($.autoprefixer({browsers: ['last 2 version']}))
		.pipe(gulp.dest(config.temp));	// TODO add the config
});

gulp.task('less-watcher', function () {
	gulp.watch([config.less], ['styles']);
});

gulp.task('templatecache', ['clean-code'], function () {
	log('Creating AngularJS template cache');
	
	return gulp
		.src(config.htmltemplates)
		.pipe($.minifyHtml({empty: true}))
		.pipe($.angularTemplatecache(
			config.templateCache.file,
			config.templateCache.options
		))
		.pipe(gulp.dest(config.temp));
});

gulp.task('wiredep', function () {
	log('Add bower js and css as well as app js to index.html')
	
	var options = config.getWiredepConfigOptions();
		
	return gulp
		.src(config.index)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.root));
			
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function () {
	log('Add bower js and css as well as custom js to index.html')
			
	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css)))
		.pipe(gulp.dest(config.root));
			
});

gulp.task ('optimise', ['inject', 'fonts', 'images'], function () {
	log('Optimising and annotate the javascript, css and html');
	
	var lazypipe = require('lazypipe'),
		templateCache = config.temp + config.templateCache.file,
		cssFilter = $.filter('**/*.css', {restore: true}),
		jsLibFilter = $.filter('**/' + config.optimised.lib, {restore: true}),
		jsAppFilter = $.filter('**/' + config.optimised.app, {restore: true});
	
	return gulp
		.src(config.index)
		.pipe($.plumber())
		.pipe($.inject(gulp.src(templateCache, {read: false}), {
			starttag: '<!-- inject:templates:js -->'
		}))
		.pipe($.useref({searchPath: './'}, lazypipe().pipe($.sourcemaps.init, { loadMaps: true })))
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore)
		.pipe($.sourcemaps.init())
		.pipe(jsLibFilter)
		.pipe($.uglify())
		.pipe(jsLibFilter.restore)
		.pipe(jsAppFilter)
		.pipe($.ngAnnotate())
		.pipe($.uglify())
		.pipe(jsAppFilter.restore)
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(config.build));
		
});

/**
 * Copy assets tasks
 */

gulp.task('fonts', ['clean-fonts'], function () {
	
	log('Copying fonts');
	
	return gulp
		.src(config.fonts)
		.pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function () {
	
	log('Copying and optimising images');
	
	return gulp
		.src(config.images)
		.pipe($.imagemin({optimizationLevel: 4}))
		.pipe(gulp.dest(config.build + 'img'));
});

/**
 * Cleanup tasks
 */

gulp.task('clean', function (done) {
	var delconfig = [].concat(config.build, config.temp);
	log('Cleaning: ' + $.util.colors.blue(delconfig));
	del(delconfig, done);
});

gulp.task('clean-code', function (done) {
	var files = [].concat(
		config.temp + '**/*.js',
		config.build + '**/*.html',
		config.build + 'js/**/*.js'
	);
	clean(files, done);
});

gulp.task('clean-fonts', function (done) {
	clean(config.build + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function (done) {
	clean(config.build + 'img/**/*.*', done);
});

gulp.task('clean-styles', function (done) {
	var files = config.temp + '**/*.css';
	clean(files, done);
});

//////////////////

function clean (path, done) {
	log('Cleaning: ' + $.util.colors.blue(path));
	del(path)
		.then(done());
}

function log(msg) {
	if (typeof msg === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}