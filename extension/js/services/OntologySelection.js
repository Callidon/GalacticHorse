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

	// list of the instance to add
	var instances = {
		"@context": {
			"nao": "http://www.semanticdesktop.org/ontologies/2007/08/15/nao/#"
		},
		"@id" : "",
		"nao:hasTag": []
	};

	// the current selection
	srv.selection = [];

	/*
	 * Méthode who parse an ontolgy and return it sorted
	 */
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
        var index = srv.selection.indexOf(element);
        // if the element is not already in the selection
        if(index == -1) {
			instances["nao:hasTag"].push(element["@id"]);
            srv.selection.push(element);
        }
    }

    /*
    * Method who remove an ontology element from the selection
    */
    srv.remove = function(element) {
        var index_selection = srv.selection.indexOf(element);
        // if the element is in the selection
        if(index_selection > -1) {
			var index_instances = instances["nao:hasTag"].indexOf(element["@id"]);
			instances["nao:hasTag"].splice(index_instances, 1);
            srv.selection.splice(index_selection, 1);
        }
    }

    /*
    * Method who export the instances for a specific url
    */
    srv.exportForUrl = function(url) {
        var exported_instances = instances;
		exported_instances["@id"] = url;
        return exported_instances;
    }

	/*
	 * Method for reset the selection & the instances
	 */
	srv.reset = function() {
		srv.selection = [];
		instances["nao:hasTag"] = [];
	}
}]);
