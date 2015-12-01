(function () {
	'use strict';
	
	// @ngInject
	function RegisterCtrl(config, accountService) {
		
		this.doRegister = function () {	
			var userWithPassword = {
				user: {
					username: this.username,
					firstname: this.firstName,
					lastname: this.lastName,
					email: this.email,
					dob: this.dob,
					gender: this.gender,
					
				},			
				password: this.password
			};
			
			accountService.register(userWithPassword)
				.then(function (data) {
					console.log(data);
				});
		};
		
	}
	
	angular
		.module('app')
		.controller('RegisterCtrl', RegisterCtrl);
	
})();
