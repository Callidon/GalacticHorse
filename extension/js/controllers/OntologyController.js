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
	var url_endpoint_ontology = "https://galactic-horse.appspot.com/_ah/api/search/v1/responsebean";

	ctrl.currentState = {};

	$http.get(url_endpoint_ontology)
	.then(function(datas) {
		ctrl.currentState = OntologySelection.parseOntology(JSON.parse(datas.data.ontology));
	}, function(error) {
		console.error(error);
	});

	/*
	 * Method who test if an element is in the selection
	 */
	ctrl.isSelected = function(element) {
		return OntologySelection.isSelected(element);
	}

    /*
    * Method who add an ontology element to the selection
    */
    ctrl.add = function(element) {
        OntologySelection.add(element);
    }
}]);
