/**
* @ngdoc service
* @name GalacticHorseChrome.services:OntologySelection
* @description
* A service who store the selected elements of an Ontology
*/
angular.module("GalacticHorseChrome.services")
.service("OntologySelection", [ "$http", function($http) {
    var srv = this;
	var ontology_endpoint = "https://galactic-horse.appspot.com/_ah/api/ontology/v1/ontologybean";

    srv.elements = [];
	srv.context = {};
	srv.ontology = {
		elements : []
	};

	srv.parseOntology = function(ontology) {
		var categories = {};
		var graph = [
			  {
			    "@id": "http://example.org/BlueBadge",
			    "@type": [
			      "http://www.w3.org/1999/02/22-rdf-syntax-ns#Class"
			    ],
			    "http://www.w3.org/2000/01/rdf-schema#subClassOf": [
			      {
			        "@id": "http://example.org/ParkingType"
			      }
			    ]
			  },
			  {
			    "@id": "http://example.org/ParkingType",
			    "@type": [
			      "http://www.w3.org/1999/02/22-rdf-syntax-ns#Class"
			    ]
			  }
			];
		/*var context = ontology["@context"];
		var graph = ontology["@graph"];*/

		graph.forEach(function(element, index, array) {
			if(element["http://www.w3.org/2000/01/rdf-schema#subClassOf"] === undefined) {
				categories[element["@id"]] = {
					name : element["@id"],
					elements : []
				};
			}
		});

		graph.forEach(function(element, index, array) {
			if(element["http://www.w3.org/2000/01/rdf-schema#subClassOf"] !== undefined) {
				var category = element["http://www.w3.org/2000/01/rdf-schema#subClassOf"][0]["@id"];
				categories[category].elements.push(element);
			}
		});

		return categories;
	};

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

    /*
    * Method who export the selection with the right format for App Engine
    */
    srv.export = function() {
        var res = {};

        srv.elements.forEach(function(element, index, array) {
            res[element.id] = element.name;
        });

        return res;
    }
}]);
