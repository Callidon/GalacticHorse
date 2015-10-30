/**
 * @ngdoc controller
 * @name GalacticHorseChrome.controllers:FormController
 * @description
 * A controller who handle the form in the extension
 */
angular.module("GalacticHorseChrome.controllers")
  .controller("FormController", [ "OntologySelection", function(OntologySelection) {
    var ctrl = this;

    ctrl.new_elt = "";

    ctrl.ontologyElts = OntologySelection.elements;

    /*
     * Method who remove an ontology element from the selection
     */
    ctrl.remove = function(elt) {
      OntologySelection.remove(elt);
    }

    ctrl.saveResource = function() {
      // ...
    }
  }]);
