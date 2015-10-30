/**
 * @ngdoc service
 * @name GalacticHorseChrome.services:OntologySelection
 * @description
 * A service who store the selected elements of an Ontology
 */
angular.module("GalacticHorseChrome.services", [])
  .service("OntologySelection", function() {
    var srv = this;

    srv.elements = [];

    /*
     * Method who add an ontology element to the selection
     */
    srv.add = function(element) {
      var index = srv.elements.indexOf(element);
      // if the element is not already in the selection
      if(index == -1) {
        srv.elements.push(element);
      }
    }

    /*
     * Method who remove an ontology element from the selection
     */
    srv.remove = function(elt) {
      var index = srv.elements.indexOf(elt);
      // if the element is in the selection
      if(index > -1) {
        srv.elements.splice(index, 1);
      }
    }

    /*
     * Method who check if an elemnt is in the selection
     */
    srv.isSelected = function(elt) {
      var index = srv.elements.indexOf(elt);
      return index > -1;
    }
  });
