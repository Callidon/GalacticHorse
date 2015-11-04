angular.module('myApp', ['GalacticHorseSearch.services'])
  .controller('SearchController',["$http", 'CustomSearch', function($http,CustomSearch){
    var pendingTask;
    var ctrl = this;
    var indexPage =1;


    if(ctrl.search === undefined){
      ctrl.search = "lectures";
      update();
    }

    ctrl.change = function(){
      if(pendingTask){
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(update, 800);
    };

    function update(){
     CustomSearch.init(ctrl.search).then(function(data){ctrl.details = data},function(error){console.log(error)});
    }

    ctrl.update = function(search){
      ctrl.search = search.Title;
      ctrl.change();
    };


    ctrl.nextPage = function(){
      CustomSearch.nextPage().then(function(data){ctrl.details = data},function(error){console.log(error)});
    }  
    
    ctrl.previousPage = function(){
      CustomSearch.previousPage().then(function(data){ctrl.details = data},function(error){console.log(error)});
    }  


  }]);
  
  