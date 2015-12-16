/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:OntologyController
* @description
* A controller which handle the display of the ontology
*/
angular.module("GalacticHorseChrome.controllers")
.controller("OntologyController", [ "OntologySelection", "GoogleAuth", "$http", function(OntologySelection, GoogleAuth, $http) {
    var ctrl = this;
	var url_endpoint_ontology = "https://galactic-horse.appspot.com/_ah/api/search/v1/ontology";

	ctrl.is_loading = true;
	ctrl.is_login = false;

	ctrl.currentState = {};

	// check if the user is login
	GoogleAuth.isLogin()
	.then(function(result) {
		ctrl.is_login = result;

		// retrieve the ontology from the endpoint
		$http.get(url_endpoint_ontology)
		.then(function(datas) {
			ctrl.is_loading = false;
			ctrl.currentState = OntologySelection.parseOntology(JSON.parse(datas.data.ontology));
		}, function(error) {
			console.error(error);
		});
	}, function(error) {
		console.error(error);
	});

	/*
	 * Method which test if an element is in the selection
	 */
	ctrl.isSelected = function(element) {
		return OntologySelection.isSelected(element);
	}

    /*
    * Method which add an ontology element to the selection
    */
    ctrl.add = function(element) {
        OntologySelection.add(element);
    }
}]);
