(function () {

	'use strict';

	function addPerson () {

		// @ngInject
		function addPersonCtrl (AddPersonService) {
			var exports = {};

			// The array of people added
			exports.people = AddPersonService.people;

			// Add a person to the array
			exports.addEmpty = AddPersonService.addEmpty;

			// Add a person to the array
			exports.save = function (isValid) {
				if (isValid) {
					AddPersonService.save();
				}
			};

			exports.deletePerson = function (arrIndex) {
				AddPersonService.delete(arrIndex);
			};

			return exports;
		}

		function link ($scope, $element, $attrs, $ctrl) {

		}

		return {
			scope: {},
			restrict: 'E',
			templateUrl: 'app/components/addPersonDirective/view.html',
			controllerAs: 'vm',
			controller: addPersonCtrl,
			link: link
		};	
	}

	angular
		.module('app')
		.directive('addPerson', addPerson);

})();
