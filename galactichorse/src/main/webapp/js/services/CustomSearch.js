/**
* @ngdoc service
* @name GalacticHorseChrome.services:CustomSearch
* @description
* A service who handle the interactions with the Custom Search API
* authors : Alexis Giraudet, Pierre Gaultier, Thomas Minier
*/
angular.module('GalacticHorseSearch.services')
.service('CustomSearch',["$http", "$q", function($http, $q){
	var srv = this;
	var apiKey = "AIzaSyA6FZQslvsM5r1Sm9aWTiczBChi1y8_zfU";

	/*
	* Method who request the datas from Custom search API
	*/
	var fetch = function(indexPage) {
		var deferred = $q.defer();
		$http.get("https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&cx=017467722503310211408:bkj5o5rfvk0&q=" + srv.search +"&start=" + indexPage)
		.then(function(datas) {
			srv.details = datas;
			deferred.resolve(datas);
		}, function(error) {
			deferred.reject(error);
		});
		return deferred.promise;
	}

	/*
	* Method who init the search & fetch the first page of the search
	*/
	srv.init = function(searchString){
		srv.search = searchString;
		return fetch(1);
	}

	/*
	* Method who jump to the next page of the search
	*/
	srv.nextPage = function(){
		indexPage = srv.details.data.queries.nextPage[0].startIndex;
		return fetch(indexPage);
	}

	/*
	* Method who jump to the previous page of the search
	*/
	srv.previousPage = function(){
		indexPage = srv.details.data.queries.previousPage[0].startIndex;
		return fetch(indexPage);
	}

}]);
