
angular.module('GalacticHorseSearch.services')
  .service('CustomSearch',["$http", function($http){
	var url ="https://ajax.googleapis.com/ajax/services/search";
	var apiKey="AIzaSyA6FZQslvsM5r1Sm9aWTiczBChi1y8_zfU";
    var srv = this;
    var indexPage = 1;
	
	var fetch=function(){
      return $http.get("https://www.googleapis.com/customsearch/v1?key=" +apiKey+ "&cx=017576662512468239146:omuauf_lfve&q=" + srv.search +"&start=" +indexPage);
    }
	
    srv.init = function(){
		return fetch();
	}   
    
    srv.nextPage = function(){
      indexPage=srv.details.queries.nextPage[0].startIndex;
      return fetch();
    }  
    
    srv.previousPage = function(){
      indexPage=srv.details.queries.previousPage[0].startIndex;
      return fetch();
    }  

  }]);