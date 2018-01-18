(function(){

	angular.module('app')
		.config(['$stateProvider', function($stateProvider){

			let states = [

				{
	                name: 'home',
	                url: '',
	                template : '<home></home>'
            	},

            	{
	                name: 'home2',
	                url: '/',
	                template : '<home></home>'
            	},
			
				{
					name : 'list',
					url: '/list',
					component: 'list',
					resolve : {
						books : function(dataService){
						let inpObj = {
								urlPre : 'https://www.anapioficeandfire.com/api/books?page=',
								pageLimiter : 2,
								initialValue : 1,
								urlSuf : '&pageSize=10'
							};
							return dataService.getRequestedData(inpObj)
						}
					}
				},

				{
					name : 'characterList',
					url : '/CharacterList',
					component : 'charlist',
					resolve : {
						characters : function(dataService){
							let inpObj = {
								urlPre : 'https://www.anapioficeandfire.com/api/characters?page=',
								pageLimiter : 107,//107
								initialValue : 0,
								urlSuf : '&pageSize=20'
							};
							return dataService.getRequestedData(inpObj)
						}
					}
				},

				{
					name : 'houseList',
					url  : '/houseList',
					component : 'houselist',
					resolve : {
						houses : function(dataService){
							let inpObj = {
								urlPre : 'https://www.anapioficeandfire.com/api/houses?page=',
								pageLimiter : 9,
								initialValue : 1,
								urlSuf : '&pageSize=50'
							};
							return dataService.getRequestedData(inpObj)
						}
					}

				},

				{
					name : 'houseDetails',
					url : '/houseList/{houseUrl}',
					component : 'housedetails',
					resolve : {
						houseDetail : function (dataService, $transition$){
							return dataService.getSingleData($transition$.params().houseUrl)
						}
					}
				},

				{
					name : 'bookDetails',
					url  : '/list/{bookUrl}',
					component : 'bookdetails',
					resolve	: {
						bookDetail : function(dataService, $transition$){
							return dataService.getSingleData($transition$.params().bookUrl)
						}
					}
				},

				{
					name : 'characterDetails',
					url  : '/characterList/{characterUrl}',
					component : 'characterdetails',
					resolve	: {
						characterDetail : function(dataService, $transition$){
							return dataService.getSingleData($transition$.params().characterUrl)
						}
					}
				}
			]
			
			states.forEach(function(state){
				$stateProvider.state(state)
			})

		}]);
}())