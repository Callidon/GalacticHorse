/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:TagController
* @description
* A controller who handle the display of an ontology tag
*/
angular.module("GalacticHorseChrome.controllers")
.controller("TagController", [ "$scope", function($scope) {
    var ctrl = this;

	ctrl.uri = $scope.uri;
}]);
