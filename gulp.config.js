module.exports = function () {
	var client = './app/',
		temp = './.tmp/',
		config = {
		
		/*
		 * File Paths
		 */
	
		// all js to vet
		alljs: [
			client + '**/*.js'
		],
		
		/**
		 * Bower and NPM locations
		 */
		bower: {
			json: require('./bower.json'),
			directory: 'bower_components',
			ignorePath: '..'
		},
		
		build: './build/',
		client: client,
		css: temp + 'styles.css',
		fonts: './bower_components/font-awesome/fonts/**/*.*',
		htmltemplates: client + '**/*.html',
		images: './assets/img/**/*.*', 
		
		index: 'index.html',
		
		js: [
			client + '**/*.module.js',
			client + '**/*.js',
			'!' + client + '**/*.spec.js'
		],
		
		// all Less files
		less: './assets/less/**/*.less',
		lessMainFile: ['./assets/less/styles.less', './bower_components/bootstrap/less/bootstrap.less'],
		
		optimised: {
			app: 'app.js',
			lib: 'lib.js'
		},
		
		root: './',
	
		temp: temp,
		
		/**
		 * Template Cache
		 */
		templateCache: {
			file: 'templates.js',
			options: {
				modules: 'app',
				standalone: false,
				root: 'app/'
			}
		},
		
	};
	
	config.getWiredepConfigOptions = function () {
		var options = {
			bowerJson: config.bower.json,
			directory: config.bower.directory,
			ignorePath: config.bower.ignorePath
		};
		
		return options;
	};

	return config;
};