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
        "post" : "https://galactic-horse.appspot.com/_ah/api/galactichorse/v1/post/"
    }
  })
  .controller("FormController", [ "ApiConstants", "OntologySelection", "$http", function(ApiConstants, OntologySelection, $http) {
    var ctrl = this;

    ctrl.new_elt = {};
    // various flags for the saveResource operation
    ctrl.FLAG_processing = false;
    ctrl.FLAG_success = false;
    ctrl.FLAG_error = false;

    ctrl.ontologyElts = OntologySelection.elements;

    /*
     * Method who remove an ontology element from the selection
     */
    ctrl.remove = function(elt) {
      OntologySelection.remove(elt);
    }

    ctrl.saveResource = function() {
        // raise a flag to signal that the extension is processing the datas
        ctrl.FLAG_processing = true;
        // saving the resource on the app engine
        $http.post(ApiConstants.resources_endpoint.post, ctrl.new_elt)
            .then(function(datas) {
                // updating the flags
                ctrl.FLAG_processing = false;
                ctrl.FLAG_success = true;

                // resetting the form
                ctrl.new_elt = {};
            }, function(error) {
                // updating the flags
                ctrl.FLAG_processing = false;
                ctrl.FLAG_error = true;
                console.log(error);
            });
    }
  }]);
