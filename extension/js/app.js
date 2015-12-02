
angular.module("GalacticHorseChrome",
	[
		"GalacticHorseChrome.controllers",
		"GalacticHorseChrome.directives",
		"GalacticHorseChrome.services"
	])
	.run(["$http", function($http) {
		// if the user is connected, set his token in the HTPP header fields
		chrome.storage.local.get("gh_token", function(items) {
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError.message);
			} else {
				$http.defaults.headers.common["X-Acces-Token"] = items.gh_token || "";
			}
		});
	}]);
