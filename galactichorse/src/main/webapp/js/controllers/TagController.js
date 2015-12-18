/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:TagController
* @description
* A controller who handle the display of an ontology tag
* authors : Alexis Giraudet, Pierre Gaultier, Thomas Minier
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
		case "access:ManualDoor":
		ctrl.tag ="fa fa-minus";
		break;
		case "access:PoweredDoor":
		ctrl.tag ="fa fa-minus-square-o";
		break;
		case "access:AutomaticDoor":
		ctrl.tag ="fa fa-minus-square";
		break;
		case "access:Elevator":
		ctrl.tag ="fa fa-building";
		break;
		case "access:Stairs":
		ctrl.tag ="fa fa-signal";
		break;
		case "access:EasyAccess":
		ctrl.tag ="fa fa-thumbs-o-up";
		break;
		case "access:DifficultAccess":
		ctrl.tag ="fa fa-thumbs-o-down";
		break;
	}

}]);
