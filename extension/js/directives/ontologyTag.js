/**
 * @ngdoc directive
 * @name GalacticHorseChrome.directives:ontologyTag
 * @scope
 * @restrict AE
 * @description
 * A tag wich can be parameterized
 */
angular.module("GalacticHorseChrome.directives")
    .directive("ontologyTag", function() {
        return {
            restrict: "AE",
			scope : {
				uri : "@uri"
			},
            templateUrl: "partials/ontologyTag.html",
            controller: "TagController as tagCtrl"
        }
    });
