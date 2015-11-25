/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:OntologyController
* @description
* A controller who handle the display of the ontology
*/
angular.module("GalacticHorseChrome.controllers")
.controller("OntologyController", [ "OntologySelection", "$http", function(OntologySelection, $http) {
    var ctrl = this;
	var elements = {};
	var ontology_endpoint = "https://galactic-horse.appspot.com/_ah/api/ontology/v1/ontologybean";

	var elements = OntologySelection.parseOntology({});
	ctrl.currentcategories = elements.categories;
    ctrl.currentElt = elements;
    ctrl.previous = [];

    /*
    * Method who add an ontology element to the selection
    */
    ctrl.add = function(elt) {
        OntologySelection.add(elt);
    }

    /*
    * Method who check if an elemnt is in the selection
    */
    ctrl.isSelected = function(elt) {
        return OntologySelection.isSelected(elt);
    }

    /*
    * Method who naviaget to a sub category
    */
    ctrl.navigate = function(subCategory) {
        // push the current state in list of previous states
        ctrl.previous.push({
            categories : ctrl.currentcategories,
            elements : ctrl.currentElt
        });
        // update the current state with the new content
        ctrl.currentElt = subCategory.content.elements;
        ctrl.currentcategories = subCategory.content.categories;
    }

    /*
    * Method who go back to the previous sub category
    */
    ctrl.goBack = function() {
        // retrieve the previous state from the list
        var length = ctrl.previous.length;

        // if a previous state exist
        if(length > 0) {
            var lastState = ctrl.previous[length - 1];

            // update the current state with the new content
            ctrl.currentElt = lastState.elements;
            ctrl.currentcategories = lastState.categories;

            // delete the state from the list of previous state
            ctrl.previous.splice(length - 1, 1);
        }
    }
}]);
