
/**
 * @ngdoc controller
 * @name GalacticHorseSearch.controllers:SearchController
 * @description
 * A controller who handle the searchs made by the user
 */
angular.module('GalacticHorseSearch.controllers')
  .controller('SearchController',["$http", 'CustomSearch', function($http,CustomSearch){
    var pendingTask;
    var ctrl = this;
    var indexPage =1;

    /*
     * We set the search as "lectures" by default
     */
    if(ctrl.search === undefined){
      ctrl.search = "lectures";
      update();
    }
    
     /*
     * fonction which update the page on a change in the search input
     */
    ctrl.change = function(){
      if(pendingTask){
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(update, 800);
    };

     /*
     * fonction which get the search from the input by an http get, and put it in ctrl.details
     */
    function update(){
     CustomSearch.init(ctrl.search).then(function(data){
		 ctrl.details = data
		 console.log(ctrl.details)
		},function(error){
			console.log(error)
		});
    }


     /*
     * fonction which display the next page of the actual search
     */
    ctrl.nextPage = function(){
      CustomSearch.nextPage().then(function(data){
		  ctrl.details = data
		},function(error){
			console.log(error)
		});
    }  

     /*
     * fonction which display the previous page of the actual search
     */    
    ctrl.previousPage = function(){
      CustomSearch.previousPage().then(function(data){
		  ctrl.details = data
		},function(error){
			console.log(error)
		});
    }

  }]);