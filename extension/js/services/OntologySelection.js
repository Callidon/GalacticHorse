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

    srv.add = function(element) {
      srv.elements.push(element);
    }
  });
