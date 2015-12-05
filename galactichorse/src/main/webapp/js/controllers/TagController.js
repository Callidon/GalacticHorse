/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:TagController
* @description
* A controller who handle the display of an ontology tag
*/
angular.module("GalacticHorseSearch.controllers")
.controller("TagController", [ "$scope", function($scope) {
    var ctrl = this;
	ctrl.uri = $scope.uri;
	ctrl.label = $scope.label;

		switch(ctrl.uri) {
			case "access:AudioGuide":
				ctrl.tag ="fa-file-audio-o";
				break;
			case "access:VisioGuide":
				 ctrl.tag ="fa-binoculars";
				break;
			case "access:BlueBadge":
				 ctrl.tag ="fa-check-circle";
				break;
			case "access:PayAndDisplay":
				ctrl.tag ="fa-cc-paypal";
				break;
		}

}]);
