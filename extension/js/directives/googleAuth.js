/**
* @ngdoc directive
* @name GalacticHorseChrome.directives:googleAuth
* @scope
* @restrict E
* @description
* A form to signin with a Google account
* authors : Alexis Giraudet, Pierre Gaultier, Thomas Minier
*/
angular.module("GalacticHorseChrome.directives")
.directive("googleAuth", function() {
	return {
		restrict: "E",
		templateUrl: "partials/googleAuth.html",
		controller: "AuthController as authCtrl"
	}
});
