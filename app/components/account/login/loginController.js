(function () {
	'use strict';

	// @ngInject
	function LoginCtrl (config, accountService) {
	
		this.doLogin = function () {
			accountService.login(this.username, this.password)
				.then(function (data) {
					console.log('Success Controller: ' + data);
				}).catch(function (error) {
					console.log('Error Controller: There was an error');
				});

		};
	}

	angular
		.module('app')
		.controller('LoginCtrl', LoginCtrl);

})();
