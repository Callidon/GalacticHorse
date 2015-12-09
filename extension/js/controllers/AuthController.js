/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:AuthController
* @description
* A controller who handle the authentification using Google Account
*/
angular.module("GalacticHorseChrome.controllers")
.controller("AuthController", ["GoogleAuth",  function(GoogleAuth) {
    var ctrl = this;
	ctrl.is_login = false;

	GoogleAuth.isLogin()
	.then(function(result) {
		ctrl.is_login = result;
	}, function(error) {
		console.error(error);
	});

	/*
	 * Method who handle the authentification of the user
	 */
	ctrl.login = function() {
		GoogleAuth.login()
		.then(function(result) {
			ctrl.is_login = true;
		}, function(error) {
			console.error(error);
		})
	}

<<<<<<< HEAD
	/*
	 * Method which logout the user
	 */
	ctrl.logout = function() {
		GoogleAuth.logout();
=======
				chrome.storage.local.set({ "gh_token" : token }, function() {
				});
			}
		});
>>>>>>> 62f6eceefcf4e15542ce591731c6a9f3de400b78
	}
}]);
