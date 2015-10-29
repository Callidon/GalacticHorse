/**
 * @ngdoc controller
 * @name GalacticHorseChrome.controllers:OntologyController
 * @description
 * A controller who handle the display of the ontology
 */
angular.module("GalacticHorseChrome.controllers")
  .controller("OntologyController", [ "OntologySelection", function(OntologySelection) {
    var ctrl = this;

    ctrl.elements = [
      {
          id: 0,
          name : "Handicap moteur"
      },
      {
          id: 1,
          name: "Handicap visuel"
      }
    ];

    ctrl.add = function(elt) {
      OntologySelection.add(elt);
    }
  }]);
