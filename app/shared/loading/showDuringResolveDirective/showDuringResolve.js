// 'use strict';

// // @ngInject
// function showDuringResolve($rootScope) {

// 	// @ngInject
// 	function showDuringResolveCtrl() {

// 	}

// 	function link($scope, $element, $attrs, $ctrl) {
// 		$element.addClass('ng-hide');

// 		var unregister = $rootScope.$on('$routeChangeStart', function () {
// 			$element.removeClass('ng-hide');
// 		});

// 		$scope.$on('$destroy', unregister);
// 	}

// 	return {
// 		scope: {},
// 		restrict: 'E',
// 		templateUrl: "views/showDuringResolveDirectiveView.html",
// 		controllerAs: 'vm',
// 		controller: showDuringResolveCtrl,
// 		link: link
// 	}

// }

// angular
// 	.module("app")
// 	.directive("showDuringResolve", showDuringResolve);
	