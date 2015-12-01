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
			"nao": "http://www.semanticdesktop.org/ontologies/2007/08/15/nao/#",
			"access" : "http://purl.org/net/accessiblity/"
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
		var context = ontology["@context"];
		var graph = ontology["@graph"];
		var categories = {};

		graph.forEach(function(element, index, array) {
			if(element["subClassOf"] === undefined) {
				categories[element["@id"]] = {
					name : element["@id"],
					elements : []
				};
			}
		});

		graph.forEach(function(element, index, array) {
			if(element["subClassOf"] !== undefined) {
				var category = element["subClassOf"];
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
	 * Method who test if an element is in the selection
	 */
	srv.isSelected = function(element) {
		return (srv.selection.indexOf(element) != -1);
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
