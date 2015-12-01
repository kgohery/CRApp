(function () {

	'use strict';

	function HomeService () {

		var exports = {};

		exports.someValue = 'this is the value';

		exports.someMethod = function () {

		};

		return exports;
	}

	angular
		.module('app')
		.factory('HomeService', HomeService);

})();
