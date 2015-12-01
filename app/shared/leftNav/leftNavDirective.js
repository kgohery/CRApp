(function () {
	'use strict';

	function leftNav () {

		// @ngInject
		function leftNavCtrl () {
		}

		function link ($scope, $element, $attrs, $ctrl) {
		}

		return {
			scope: {},
			restrict: 'E',
			templateUrl: 'app/shared/leftNav/view.html',
			controllerAs: 'vm',
			controller: leftNavCtrl,
			link: link
		};
	}

	angular
		.module('app')
		.directive('leftNav', leftNav);

})();
