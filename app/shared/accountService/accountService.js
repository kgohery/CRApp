(function () {

	'use strict';

	// @ngInject
	function accountService($http, config) {

		var exports = {};
		var api = config.apiUrl + config.apiKey + '/';

		exports.getFees = function (orgId) {
			return $http({
				method: 'GET',
				url: api + 'fees'
			});
		};

		// Register a new person
		exports.register = function (person) {
			person.confirmEmail = true;
			return $http({
				method: 'POST',
				url: config.apiUrl + 'account/register',
				data: person
			})
			.catch(function (error) {
				console.log(error.data);
			});
			// .then(function (data) {
			// 	console.log('accountService: Login successful');
			// 	return data;
			// })
			// .catch(function (error) {
			// 	console.log('accountService: ' + error.data.error_description);
			// 	return error.data;
			// });
		};

		// validate the users details, get the JWT and save it to local storage
		exports.login = function (username, password) {
			return $http({
				method: 'POST',
				url: config.tokenEndpoint,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: 'grant_type=password&username=' + username + '&password=' + password
			})
			.then(function (data) {
				localStorage.setItem('regToken', data.data.access_token);
				return data.data;
			})
			.then(function (data) {
				console.log('accountService: Login successful');
				return data;
			})
			.catch(function (error) {
				console.log('accountService: ' + error.data.error_description);
				return error.data;
			});
		};

		exports.addPerson = function (person) {
			return $http({
				method: 'post',
				url: api + 'person',
				data: person
			});
		};

		return exports;

	}

	angular
		.module('app')
		.factory('accountService', accountService);

})();
