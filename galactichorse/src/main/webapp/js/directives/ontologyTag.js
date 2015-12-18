/**
* @ngdoc directive
* @name GalacticHorseSearch.directives:ontologyTag
* @scope
* @restrict AE
* @description
* A tag wich can be parameterized
* authors : Alexis Giraudet, Pierre Gaultier, Thomas Minier
*/
angular.module("GalacticHorseSearch.directives")
.directive("ontologyTag", function() {
	return {
		restrict: "AE",
		scope : {
			uri : "@uri",
			label : "@label"
		},
		templateUrl: "partials/ontologyTag.html",
		controller: "TagController as tagCtrl"
	}
});
