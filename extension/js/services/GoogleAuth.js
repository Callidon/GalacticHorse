/**
* @ngdoc service
* @name GalacticHorseChrome.services:GoogleAuth
* @description
* A service which store the selected elements of an Ontology
*/
angular.module("GalacticHorseChrome.services")
.service("GoogleAuth", ["$q", "$http", function($q, $http) {
    var srv = this;

	/*
	 * Variable which indicate if an user is login or not
	 */
	srv.isLogin = function() {
		var deferred = $q.defer();
		// refresh the state of the authentification
		chrome.storage.local.get("gh_token", function(items) {
			if (chrome.runtime.lastError) {
				deferred.reject(chrome.runtime.lastError.message);
			} else {
				deferred.resolve(items.gh_token !== undefined);
			}
		});
		return deferred.promise;
	}

	/*
	 * Method which retrieve the token from the storage
	 */
	srv.retrieveToken = function() {
		var deferred = $q.defer();
		chrome.storage.local.get("gh_token", function(items) {
			if (chrome.runtime.lastError) {
				deferred.reject(chrome.runtime.lastError.message);
			} else {
				deferred.resolve(items.gh_token);
			}
		});
		return deferred.promise;
	}

	/*
	 * Method which handle the authentification of the user
	 */
	srv.login = function() {
		var deferred = $q.defer();
		chrome.identity.getAuthToken({ interactive : true }, function(token) {
			if (chrome.runtime.lastError) {
				deferred.reject(chrome.runtime.lastError.message);
			} else {
				// set the http header & store the token
				$http.defaults.headers.common["X-Acces-Token"] = token || "";

				chrome.storage.local.set({ "gh_token" : token }, function() {
					srv.isLogin = true;
					deferred.resolve({ "message" : "Successfully authentificated", "token" : token});
				});
			}
		});
		return deferred.promise;
	}

	/*
	 * Method which logout the user
	 */
	srv.logout = function() {
		srv.retrieveToken()
		.then(function(token) {
			chrome.identity.removeCachedAuthToken({ "token" : token }, function() {
				if (chrome.runtime.lastError) {
					deferred.reject(chrome.runtime.lastError.message);
				} else {
					// delete the token from the storage & the HTTP headers
					chrome.storage.local.remove("gh_token", function() {
						srv.isLogin = false;
						$http.defaults.headers.common["X-Acces-Token"] = "";
					});
				}
			});
		}, function(error) {
			console.error();
		});
	}
}]);
