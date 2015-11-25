/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:OntologyController
* @description
* A controller who handle the display of the ontology
*/
angular.module("GalacticHorseChrome.controllers")
.controller("OntologyController", [ "OntologySelection", "$http", function(OntologySelection, $http) {
    var ctrl = this;
	ctrl.currentState = [];
	var ontology_endpoint = "https://galactic-horse.appspot.com/_ah/api/ontology/v1/ontologybean";

    ctrl.currentState = OntologySelection.parseOntology({});

    /*
    * Method who add an ontology element to the selection
    */
    ctrl.add = function(elt) {
        OntologySelection.add(elt);
    }
}]);
