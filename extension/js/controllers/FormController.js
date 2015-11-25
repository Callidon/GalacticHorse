/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:FormController
* @description
* A controller who handle the form in the extension
*/
angular.module("GalacticHorseChrome.controllers")
.constant("ApiConstants", {
    "ontology_endpoint" : "",
    "resources_endpoint" : {
        "get" : "https://galactic-horse.appspot.com/_ah/api/galactichorse/v1/get/",
        "post" : "https://galactic-horse.appspot.com/_ah/api/search/v1/put"
    }
})
.controller("FormController", [ "ApiConstants", "OntologySelection", "$http", function(ApiConstants, OntologySelection, $http) {
    var ctrl = this;

    ctrl.new_elt = "";
    // various flags for the saveResource operation
    ctrl.FLAG_processing = false;
    ctrl.FLAG_success = false;
    ctrl.FLAG_error = false;

    ctrl.ontologyElts = OntologySelection.selection;

    /*
    * Method who remove an ontology element from the selection
    */
    ctrl.remove = function(elt) {
        OntologySelection.remove(elt);
    }

    ctrl.saveResource = function() {
        // correctly format the datas
        var exported_selection = OntologySelection.exportForUrl(ctrl.new_elt);
        var datas = {
            "url" : ctrl.new_elt,
            "tags" : exported_selection
        };

        // raise a flag to signal that the extension is processing the datas
        ctrl.FLAG_processing = true;
        // saving the resource on the app engine
        $http.post(ApiConstants.resources_endpoint.post, datas)
            .then(function(datas) {
                // updating the flags
                ctrl.FLAG_processing = false;
                ctrl.FLAG_success = true;

                // resetting the form
                ctrl.new_elt = {};
				OntologySelection.reset();
            }, function(error) {
                // updating the flags
                ctrl.FLAG_processing = false;
                ctrl.FLAG_error = true;
                console.error(error);
            });
    }
}]);
