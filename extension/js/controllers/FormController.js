/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:FormController
* @description
* A controller who handle the form in the extension
*/
angular.module("GalacticHorseChrome.controllers")
.controller("FormController", [ "OntologySelection", "$http", function(OntologySelection, $http) {
    var ctrl = this;
	var url_endpoint_put = "https://galactic-horse.appspot.com/_ah/api/search/v1/putUrlModel";

    ctrl.new_url = "";
    // various flags for the saveResource operation
    ctrl.FLAG_processing = false;
    ctrl.FLAG_success = false;
    ctrl.FLAG_error = false;

    ctrl.ontologyElts = OntologySelection.selection;

	// get the url of the active tab
	chrome.tabs.query({ active : true, lastFocusedWindow : true}, function(tabs) {
		ctrl.new_url = tabs[0].url;
	});

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
            "url" : ctrl.new_url,
            "model" : JSON.stringify(exported_selection),
			"urls" : []
        };



        // raise a flag to signal that the extension is processing the datas
        ctrl.FLAG_processing = true;
        // saving the resource on the app engine
        $http.post(url_endpoint_put, datas)
            .then(function(datas) {
                // updating the flags
                ctrl.FLAG_processing = false;
                ctrl.FLAG_success = true;

                // resetting the form
                ctrl.new_url = "";
				OntologySelection.reset();
            }, function(error) {
                // updating the flags
                ctrl.FLAG_processing = false;
                ctrl.FLAG_error = true;
                console.error(error);
            });
    }
}]);
