(function(){

	angular.module('app')
		
		.controller('homeController', ['constants', function homeController(constants){

		let vm = this;
		vm.home = 
		vm.appName = constants.APP_TITLE;
		vm.appDescription = constants.APP_DESCRIPTION;
		vm.appVersion = constants.APP_VERSION;
		console.log('home controller is initiated');

	}]);

}())