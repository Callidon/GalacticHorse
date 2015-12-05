/**
 * @ngdoc directive
 * @name GalacticHorseSearch.directives:ontologyTag
 * @scope
 * @restrict AE
 * @description
 * A tag wich can be parameterized
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
