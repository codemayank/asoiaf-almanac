(function(){

	angular.module('app')
		.factory('dataService', ['$http', '$q', dataService])

	function dataService($http, $q){

		return {

			getRequestedData : getRequestedData,
			getSingleData : getSingleData

		}

		function getRequestedData(obj){

			promiseStack = [];
			for (let i = obj.initialValue; i <= obj.pageLimiter; i++){
				promiseStack.push($http.get(obj.urlPre + i + obj.urlSuf, {cache: true}));
			}

			return $q.all(promiseStack)
				.then(sendResponseData)		
				.catch(sendGetDataError)

		}// end of getRequestedData

		function getSingleData(url){
			return $http({
				method : 'GET',
				url : url,
				transformResponse : transformGetSingleData,
				cache : true
			})
			.then(function(response){
				return response.data
			})
			.catch(function(errorMsg){
				console.log(errorMsg)
			});
		} //end of getSingleData

		function transformGetSingleData(data, headersGetter){
			let transformed = angular.fromJson(data)

				if (transformed.url.indexOf("/books/") !== -1){
					transformed.bookPovCharacters = [];

					transformed.povCharacters.forEach(function(characterUrl){
						$http.get(characterUrl, {cache: true})
							.then(function(response){
								transformed.bookPovCharacters.push({
									characterName : response.data.name,
									characterUrl : response.data.url
								});
							})
							.catch(function(errorMsg){
								console.log(errorMsg);
							})
					})	
				}

				if (transformed.url.indexOf("/characters/") !== -1){
					transformed.povInBooks = [];
					transformed.charAllegiance = [];
					transformed.charFather = "";
					transformed.charMother = "";
					transformed.charSpouse = "";

					if(transformed.father.length != 0){
						$http.get(transformed.father, {cache: true})
						.then(function(response){
							transformed.charFather = response.data.name; 
						})
						.catch(function(errorMsg){
							console.log(errorMsg)
						})	
					}
					
					if(transformed.mother.length != 0){
						$http.get(transformed.mother, {cache: true})
						.then(function(response){
							transformed.charMother = response.data.name;
						})
						.catch(function(errorMsg){
							console.log(errorMsg)
						})	
					}

					if(transformed.spouse.length != 0){
						$http.get(transformed.spouse, {cache: true})
						.then(function(response){
							transformed.charSpouse = response.data.name;
						})
						.catch(function(errorMsg){
							console.log(errorMsg)
						})	
					}
					
					if(transformed.povBooks.length != 0){
						transformed.povBooks.forEach(function(bookUrl){
							$http.get(bookUrl, {cache: true})
								.then(function(response){
									transformed.povInBooks.push({
										bookName : response.data.name,
										bookUrl : response.data.url
									});
								})
								.catch(function(errorMsg){
									console.log(errorMsg);
								})
						})
					}
					
					if(transformed.allegiances.length != 0){
						transformed.allegiances.forEach(function(houseUrl){
							$http.get(houseUrl, {cache: true})
								.then(function(response){
									transformed.charAllegiance.push({
										houseName : response.data.name,
										houseUrl : response.data.url
									});
								})
								.catch(function(errorMsg){
									console.log(errorMsg);
								})
						})	
					}
						
				}

				if(transformed.url.indexOf("/houses/") != -1){
					transformed.houseCadetBranches = [];
					transformed.houseSwornMembers = [];
					transformed.houseCurrentlord = "";
					transformed.houseHeir = "";
					transformed.houseOverlord = "";
					transformed.houseFounder = "";

					if(transformed.currentLord.length != 0){
						$http.get(transformed.currentLord, {cache: true})
							.then(function(response){
								transformed.houseCurrentlord = response.data.name;
							})
							.catch(function(errorMsg){
								console.log(errorMsg)
							});	
					}

					if(transformed.heir.length != 0){
						$http.get(transformed.heir, {cache: true})
							.then(function(response){
								transformed.houseHeir = response.data.name;
							})
							.catch(function(errorMsg){
								console.log(errorMsg)
							});
					}

					if(transformed.overlord.length != 0){
						$http.get(transformed.overlord, {cache: true})
							.then(function(response){
								transformed.houseOverlord = response.data.name;
							})
							.catch(function(errorMsg){
								console.log(errorMsg)
							});
					}

					if(transformed.founder.length != 0){
						$http.get(transformed.founder, {cache: true})
							.then(function(response){
								transformed.houseFounder = response.data.name;
							})
							.catch(function(errorMsg){
								console.log(errorMsg)
							});
					}

					if(transformed.cadetBranches.length != 0){
						transformed.cadetBranches.forEach(function(branch){
							$http.get(branch, {cache: true})
								.then(function(response){
									transformed.houseCadetBranches.push({
										houseName : response.data.name,
										houseUrl : response.data.url
									})
								})
								.catch(function(errorMsg){
									console.log(errorMsg)
								});
						})		
					}

					if(transformed.swornMembers.length != 0){
						transformed.swornMembers.forEach(function(member){
							$http.get(member, {cache: true})
								.then(function(response){
									transformed.houseSwornMembers.push({
										memberName : response.data.name,
										memberUrl : response.data.url
									})
								})
								.catch(function(errorMsg){
									console.log(errorMsg)
								})
						})
					}	
				}
			console.log(transformed);
			return transformed;
		} //end of tansformSingleData

		function sendResponseData(response){
			let retArr = [];
			response.forEach(function(currentValue){
				currentValue.data.forEach(function(inCurrentValue){
					retArr.push(inCurrentValue)
				})
			})
			console.log(retArr);
			return retArr;
		}//end of sendResponseData

		function sendGetDataError(response){
			return $q.reject('Error Retrieving requested information. (HTTP Status: ' + response.status + ')');
		}
	}
}());