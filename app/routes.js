(function(){

	angular.module('app')
		.config(['$routeProvider', function($routeProvider){

			$routeProvider
				.when('/', {
					templateUrl : 'app/templates/home.html',
					controller :  'ListController',
					controllerAs : 'list'
				})
				// .when('/:BookName'{
				// 	templateUrl : 'app/templates/bookdetails.html',
				// 	controller : 'BookDetailsController',
				// 	controllerAs : 'bookDetails'
				// })
		}]);
}())