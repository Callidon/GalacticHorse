/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:AuthController
* @description
* A controller who handle the authentification with Google Account
*/
angular.module("GalacticHorseChrome.controllers")
.controller("AuthController", [ "$auth", function($auth) {
    var ctrl = this;

	ctrl.signin = function() {
		$auth.authenticate("google");
	}
}]);
