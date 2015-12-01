(function () { 

	'use strict';

	// @ngInject
	function AddPersonService () {

		var exports = {},
			emptyPerson = {
				firstName: '',
				lastName: '',
				dob: ''
			};

		exports.people = [emptyPerson];

		exports.addEmpty = function (emptyPerson) {
			exports.people.push(emptyPerson);
		};

		exports.update = function (arrIndex, person) {
			exports.people[arrIndex] = person;
		};

		exports.delete = function (arrIndex) {
			exports.people.splice(arrIndex, 1);
		};

		exports.save = function () {
			console.log(exports.people.length);
		};

		return exports;
	}

	angular
		.module('app')
		.factory('AddPersonService', AddPersonService);

})();
