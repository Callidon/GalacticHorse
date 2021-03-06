
/**
* @ngdoc directive
* @name GalacticHorseSearch.directives:searchForm
* @scope
* @restrict E
* @description
* A search bar which request using a service
* authors : Alexis Giraudet, Pierre Gaultier, Thomas Minier
*/
angular.module("GalacticHorseSearch.directives")
.directive("searchForm", function() {
	return {
		restrict: "E",
		templateUrl: "partials/searchForm.html",
		controller: "SearchController as searchCtrl"
	}
});
