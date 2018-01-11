(function(){

	angular.module('app')
		.factory('dataService', ['$http', '$q', dataService])

	function dataService($http, $q){

		return {

			getAllBooks : getAllBooks,
			getBookByUrl	: getBookByUrl
		}

		function getAllBooks(){

			return $http({

				method : 'GET',
				url : 'https://www.anapioficeandfire.com/api/books'

			})
				.then(sendResponseData)
				.catch(sendGetBooksError)
		}//end of getAllBooks

		function getBookByUrl(bookUrl){

			return $http({

				method : 'GET',
				url	: bookUrl 
			})

				.then(sendResponseData)
				.catch(sendGetBooksError)

		}//end of getBookByUrl

		function sendResponseData(response){

			return response.data;
		}//end of sendResponseData

		function sendGetBooksError(){
			return $q.reject('Error Retrieving book(s). (HTTP Status: '+ response.status + ')');
		}



	}

}());