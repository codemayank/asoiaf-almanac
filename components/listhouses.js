(function(){


	angular.module('app')
		.component('houselist', {
			templateUrl : "templates/houselist.html",
			bindings : { houses : '<' }
		})

}())