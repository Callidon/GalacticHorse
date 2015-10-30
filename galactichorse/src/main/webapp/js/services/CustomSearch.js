/**
 * @ngdoc service
 * @name GalacticHorseChrome.services:CustomSearch
 * @description
 * A service who handle the interactions with the Custom Search API
 */
angular.module('GalacticHorseSearch.services')
  .service('CustomSearch',["$http", function($http){
    var srv = this;
  	var url = "https://ajax.googleapis.com/ajax/services/search";
  	var apiKey = "AIzaSyA6FZQslvsM5r1Sm9aWTiczBChi1y8_zfU";
    var indexPage = 1;
    var search = "";

    /*
     * Method who request the datas from Custom search API
     */
  	var fetch = function() {
      return $http.get("https://www.googleapis.com/customsearch/v1?key=" +apiKey+ "&cx=017576662512468239146:omuauf_lfve&q=" + search +"&start=" +indexPage);
    }

    /*
     * Method who init the search & fetch the first page of the search
     */
    srv.init = function(searchString){
      search = searchString;
  		return fetch();
  	}

    /*
     * Method who jump to the next page of the search
     */
    srv.nextPage = function(){
        indexPage = srv.details.queries.nextPage[0].startIndex;
        return fetch();
    }

    /*
     * Method who jump to the previous page of the search
     */
    srv.previousPage = function(){
        indexPage = srv.details.queries.previousPage[0].startIndex;
        return fetch();
    }

}]);
