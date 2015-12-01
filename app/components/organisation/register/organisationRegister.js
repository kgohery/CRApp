/* global Stripe */
(function () {
	'use strict';
	
	// @ngInject
	function OrgRegisterCtrl(fees, config, $scope) {
		/*jshint validthis: true */
		var vm = this;
		vm.fees = fees.data;
		vm.register = register;
		vm.stripeResponseHandler = stripeResponseHandler;
		
		//////////////////////////
		
		function stripeResponseHandler(status, response) {
			if (status === 200) {
				console.log(response);
			} else {
				console.log(response);
			}
		}

		function register(isValid) {
			angular.forEach($scope.orgRegisterForm.$error, function (field) {
				angular.forEach(field, function (errorField) {
					errorField.$setTouched();
				});
			});

			Stripe.setPublishableKey('pk_test_HsyUdjbX03ZUwxDUkTxv691m');

			Stripe.card.createToken({
				number: this.ccNumber,
				cvc: this.cvc,
				exp_month: this.exp.substring(0, 2),
				exp_year: this.exp.substring(3, 5)
			}, this.stripeResponseHandler);
	
			// Prevent the form from submitting with the default action
			return false;
		}
	}

	angular
		.module('app')
		.controller('OrgRegisterCtrl', OrgRegisterCtrl);

})();
