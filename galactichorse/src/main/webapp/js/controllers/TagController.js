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
	ctrl.tags = [];
	console.log(ctrl.uri);
	
	for (t in ctrl.uri){
		switch(t) {
		case "access:AudioGuide":
			ctrl.tags.push("fa fa-file-audio-o");
			break;
		case "access:VisioGuide":
			 ctrl.tags.push("fa fa-binoculars");
			break;
		case "access:BlueBadge":
			 ctrl.tags.push("fa fa-check-circle");
			break;
		case "access:PayAndDisplay":
			ctrl.tags.push("fa fa-cc-paypal");
			break;
		}
	}
}]);

