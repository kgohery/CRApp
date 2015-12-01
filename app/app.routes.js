/* globals OrgRegisterCtrl, FeesCtrl */

(function () {	
	
	function config($stateProvider, $urlRouterProvider) {
		//
		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise('/');
		//
		// Now set up the states
		$stateProvider
			.state('root', {
				url: '/',
				templateUrl: 'app/components/home/view.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('login', {
				url: '/login',
				templateUrl: 'app/components/account/login/view.html',
				controller: 'LoginCtrl',
				controllerAs: 'vm'
			})
			.state('register', {
				url: '/register',
				templateUrl: 'app/components/account/register/view.html',
				controller: 'RegisterCtrl',
				controllerAs: 'vm'
			})
			.state('orgAdd', {
				url: '/organisation/add',
				templateUrl: 'app/components/organisation/add/view.html',
				controller: 'OrgAddCtrl',
				controllerAs: 'vm'
			})
			.state('orgRegister', {
				url: '/organisation/register',
				templateUrl: 'app/components/organisation/register/view.html',
				controller: 'OrgRegisterCtrl',
				controllerAs: 'vm',
				resolve: { /*@ngInject*/
					fees: function (orgService) {
						return orgService.getFees();
					}
				}
			})
			.state('home', {
				url: '/home',
				templateUrl: 'app/components/home/view.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('fees', {
				url: '/fees',
				templateUrl: 'app/components/fees/view.html',
				controller: 'FeesCtrl',
				controllerAs: 'vm',
				resolve: { /*@ngInject*/
					fees: function (orgService) {
						return orgService.getFees();
					}
				}
			});
	
	}
	
	angular
		.module('app')
		.config(config);
		
})();
