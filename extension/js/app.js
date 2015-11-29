
angular.module("GalacticHorseChrome",
	[
		"GalacticHorseChrome.controllers",
		"GalacticHorseChrome.directives",
		"GalacticHorseChrome.services",
		"satellizer"
	])
	.config(["$authProvider", function($authProvider) {
		$authProvider.google({
			clientId : " 528853262624-rmokogi3miblhh392nu77ggrhmkdllmh.apps.googleusercontent.com "
		});
	}]);
