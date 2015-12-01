(function () {

	'use strict';

	angular
		.module('app', ['ui.router', 'ngMessages', 'templates']);
	
	angular
		.module('app')
		.directive('stateLoadingIndicator', function ($rootScope) {
	
			return {
				restrict: 'E',
				templateUrl: 'app/shared/loading/view.html',
				replace: true,
				link: function (scope, elem, attrs) {
					scope.isStateLoading = false;
	
					$rootScope.$on('$stateChangeStart', function () {
						scope.isStateLoading = true;
					});
					$rootScope.$on('$stateChangeSuccess', function () {
						scope.isStateLoading = false;
					});
				}
			};
		});
})();
