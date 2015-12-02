/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:AuthController
* @description
* A controller who handle the authentification using Google Account
*/
angular.module("GalacticHorseChrome.controllers")
.controller("AuthController", ["$q", "$http", function($q, $http) {
    var ctrl = this;
	ctrl.isSignin = false;

	/*
	 * Method who retrieve the auth token from the chrome storage
	 */
	var retrieveStorage = function() {
		var deferred = $q.defer();
		chrome.storage.local.get("gh_token", function(items) {
			if (chrome.runtime.lastError) {
				deferred.reject(chrome.runtime.lastError.message);
			} else {
				deferred.resolve(items);
			}
		});
		return deferred.promise;
	}

	// check if the user is already connected
	retrieveStorage()
	.then(function(items) {
		ctrl.isSignin = (items.gh_token !== undefined);
	}, function(error) {
		console.error(error);
	})

	/*
	 * Method who handle the authentification of the user
	 */
	ctrl.signin = function() {
		chrome.identity.getAuthToken({ interactive : true }, function(token) {
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError.message);
			} else {
				// set the http header & store the token
				$http.defaults.headers.common["X-Acces-Token"] = token || "";

				chrome.storage.local.set({ "gh_token" : token }, function() {
					console.log("stored");
				});
			}
		});
	}
}]);
