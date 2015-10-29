/**
 * @ngdoc directive
 * @name GalacticHorseChrome.directives:ontologyList
 * @scope
 * @restrict E
 * @description
 * An interactive list of the ontology
 */
angular.module("GalacticHorseChrome.directives")
    .directive("ontologyList", function() {
        return {
            restrict: "E",
            templateUrl: "partials/ontologyList.html",
            controller: "OntologyController as ontlgCtrl"
        }
    });
