(function () {

	'use strict';
	
	// @ngInject
	function FeesCtrl(fees) {
		this.fees = fees.data;
	}

	angular
		.module('app')
		.controller('FeesCtrl', FeesCtrl);

})();
