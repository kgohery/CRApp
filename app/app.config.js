(function () {
	
	'use strict';
	
	var url = 'http://registrationsapi/';
	var appConfig = {
			apiUrl: url + 'api/',
			apiKey: '0f8fad5b-d9cb-469f-a165-70867728950e',
			tokenEndpoint: url + 'token'
		};
	
	angular
		.module('app')
		.constant('config', appConfig);
	
})();
