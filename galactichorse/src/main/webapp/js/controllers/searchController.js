
/**
* @ngdoc controller
* @name GalacticHorseSearch.controllers:SearchController
* @description
* A controller who handle the searchs made by the user
*/
angular.module('GalacticHorseSearch.controllers')
.controller('SearchController',["$http", 'CustomSearch',"SearchMerge", function($http,CustomSearch,SearchMerge){
	var pendingTask;
	var ctrl = this;
	var indexPage = 1;
	var newSearch = true;
	ctrl.is_loading = false;

	/*
	* fonction which update the page on a change in the search input<
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
	function update() {
		ctrl.is_loading = true;
		CustomSearch.init(ctrl.search).then(function(datas){
			SearchMerge.getMergedDatas(datas.data)
			.then(function(data){
				ctrl.is_loading = false;
				console.log(data);
				ctrl.details = data;
			}, function(error){
				ctrl.is_loading = false;
				console.error(error)
			});

		}, function(error) {

		});
	}

	/*
	* fonction which display the next page of the actual search
	*/
	ctrl.nextPage = function() {
		ctrl.is_loading = true;

		CustomSearch.nextPage().then(function(datas){
			SearchMerge.getMergedDatas(datas.data)
			.then(function(data){
				ctrl.is_loading = false;
				console.log(data);
				ctrl.details = data;
			}, function(error){
				ctrl.is_loading = false;
				console.error(error)
			});
		}, function(error){
			ctrl.is_loading = false;
			console.error(error)
		});
	}

	/*
	* fonction which display the previous page of the actual search
	*/
	ctrl.previousPage = function() {
		ctrl.is_loading = true;

		CustomSearch.previousPage().then(function(datas){
			SearchMerge.getMergedDatas(datas.data)
			.then(function(data){
				ctrl.is_loading = false;
				console.log(data);
				ctrl.details = data;
			}, function(error){
				ctrl.is_loading = false;
				console.error(error)
			});
		}, function(error){
			ctrl.is_loading = false;
			console.error(error)
		});
	}

}]);
