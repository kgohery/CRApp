(function () { 
	
	'use strict';
	
	// @ngInject
	function OrgAddCtrl(config, orgService, $scope) {
	
		this.add = function (isValid) {
			angular.forEach($scope.orgAddForm.$error, function (field) {
				angular.forEach(field, function (errorField) {
					errorField.$setTouched();
				});
			});
			
			if (isValid) {
				var organisation = {
					name: this.name,
					address: {
						address1: this.address1,
						address2: this.address2,
						address3: this.address3,
						city: this.city,
						state: this.state,
						postcode: this.postcode,
						country: this.country,
						latitude: this.latitude,
						longitude: this.longitude
					}
	
				};
	
				orgService.add(organisation)
					.then(function (data) {
						console.log(data);
					});
			}
		};
	}
	
	angular
		.module('app')
		.controller('OrgAddCtrl', OrgAddCtrl);

})();
