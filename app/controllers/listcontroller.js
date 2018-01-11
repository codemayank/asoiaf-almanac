
(function(){

	angular.module('app')
		.controller('ListController', ['constants', 'dataService','$q', ListController]);

	function ListController(constants, dataService, $q){

		let vm = this;

		vm.appName = constants.APP_TITLE;
		vm.appDescription = constants.APP_DESCRIPTION;
		vm.appVersion = constants.APP_VERSION;

		dataService.getAllBooks()
			.then(getBooksSuccess)
			.catch(errorCallBack);

		function getBooksSuccess(books){
			vm.allBooks = books;
		}

		function errorCallBack(errorMsg){
			console.log('Error Message : ' + errorMsg);
		}

	}

}())
	
	
	