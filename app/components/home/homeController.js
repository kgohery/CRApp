(function () {

	'use strict';

	// @ngInject
	function HomeCtrl (HomeService) {
		this.name = 'karlie warlie';
		this.someValue = HomeService.someValue;
		throw 'foo';
	}

	angular
		.module('app')
		.controller('HomeCtrl', HomeCtrl);

})();
