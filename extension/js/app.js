
angular.module("GalacticHorseChrome",
	[
		"GalacticHorseChrome.controllers",
		"GalacticHorseChrome.directives",
		"GalacticHorseChrome.services"
	])
	.run(["GoogleAuth", "$http", function(GoogleAuth, $http) {
		// if the user is connected, set his token in the HTPP header fields
		GoogleAuth.isLogin()
		.then(function(result) {
			if(result) {
				GoogleAuth.retrieveToken()
				.then(function(token) {
					console.log(token);
					$http.defaults.headers.common["X-Acces-Token"] = token || "";
				}, function(error) {
					console.error(error);
				});
			}
		}, function(error) {
			console.error(error);
		});
	}]);
