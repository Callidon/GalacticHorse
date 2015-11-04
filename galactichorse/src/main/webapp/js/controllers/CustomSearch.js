/**
 * @ngdoc service
 * @name GalacticHorseChrome.services:CustomSearch
 * @description
 * A service who handle the interactions with the Custom Search API
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
      $http.get("https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&cx=017576662512468239146:omuauf_lfve&q=" + srv.search +"&start=" + indexPage)
        .then(function(datas) {
          srv.details = datas.data;
          deferred.resolve(datas.data);
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
        indexPage = srv.details.queries.nextPage[0].startIndex;
        return fetch(indexPage);
    }

    /*
     * Method who jump to the previous page of the search
     */
    srv.previousPage = function(){
        indexPage = srv.details.queries.previousPage[0].startIndex;
        return fetch(indexPage);
    }

}]);