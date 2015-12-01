(function () {
	'use strict';

	// @ngInject
	function orgService($http, $timeout, config) {

		var service = {
			getFees: getFees,
			add: add
		};
		
		var api = config.apiUrl + config.apiKey + '/';

		return service;

		///////////////////////

		function getFees(orgId) {
			var x = $timeout(function () {
				return $http({
					method: 'GET',
					url: api + 'fees'
				});
			}, 1000);

			return x;
		}

		// Register a new person
		function add(organisation) {

			return $http({
				method: 'POST',
				url: config.apiUrl + 'organisations',
				data: organisation
			})
			.then(function (data) {
				console.log('Success');
			})
			.catch(function (error) {
				console.log(error.data);
			});
			
		}
	}

	angular
		.module('app')
		.factory('orgService', orgService);

})();
