(function(){

	let app = angular.module('app', ['ngRoute', 'ui.router', 'angular-loading-bar']);

	app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    	cfpLoadingBarProvider.includeBar = false;
  	}])

}());