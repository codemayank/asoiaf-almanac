(function(){

	angular.module('app')
		.component('charlist', {
			bindings : {characters : '<'},
			templateUrl : 'templates/charlist.html'
		})
}())