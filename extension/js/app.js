
angular.module("GalacticHorseChrome",
	[

		"GalacticHorseChrome.controllers",
		"GalacticHorseChrome.directives",
		"GalacticHorseChrome.services",
		"pascalprecht.translate"
	])
	.config(["$translateProvider", function($translateProvider) {

		$translateProvider.translations("en", {
			"access:ParkingType" : "Parking type",
			"access:BlueBadge" : "Blue badge",
			"access:PayAndDisplay" : "Classic parking",
			"access:Guide" : "Available guides",
			"access:AudioGuide" : "Audio guide",
			"access:VisioGuide" : "Visual guide",
			"access:EntranceOpeningType" : "Entrance opening type",
			"access:ManualDoor" : "Manual door",
			"access:PoweredDoor" : "Powered door",
			"access:AutomaticDoor" : "Automatic door",
			"access:FloorAccessType" : "Floor access type",
			"access:Elevator" : "Elevator",
			"access:Stairs" : "Stairs",
			"access:EaseofAccess" : "Ease of access",
			"access:EasyAccess" : "Easy access",
			"access:DifficultAccess" : "Difficult access"
		});

		$translateProvider.translations("fr", {
			"access:ParkingType" : "Type de parking",
			"access:BlueBadge" : "Badge bleue",
			"access:PayAndDisplay" : "Classique",
			"access:Guide" : "Guide(s) disponible(s)",
			"access:AudioGuide" : "Audio-guide",
			"access:VisioGuide" : "Guide visuel",
			"access:EntranceOpeningType" : "Type d'ouverture des portes",
			"access:ManualDoor" : "Ouverture manuelle",
			"access:PoweredDoor" : "Ouverture via interrupteur",
			"access:AutomaticDoor" : "Ouverture automatique",
			"access:FloorAccessType" : "Accès aux étages",
			"access:Elevator" : "Ascenseur",
			"access:Stairs" : "Escaliers",
			"access:EaseofAccess" : "Facilité d'accès",
			"access:EasyAccess" : "Facile d'accès",
			"access:DifficultAccess" : "Difficile d'accès"
		});

		$translateProvider.preferredLanguage("en");
	}])
	.run(["GoogleAuth", "$http", "$translate", function(GoogleAuth, $http, $translate) {
		// if the user is connected, set his token in the HTPP header fields
		GoogleAuth.isLogin()
		.then(function(result) {
			if(result) {
				GoogleAuth.retrieveToken()
				.then(function(token) {
					$http.defaults.headers.common["Authorization"] = "Bearer " + token || "";
				}, function(error) {
					console.error(error);
				});
			}
		}, function(error) {
			console.error(error);
		});

		// set the default language
		$translate.use("fr");
	}]);
