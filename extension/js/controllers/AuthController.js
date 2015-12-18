/**
* @ngdoc controller
* @name GalacticHorseChrome.controllers:AuthController
* @description
* A controller which handle the authentification using Google Account
* authors : Alexis Giraudet, Pierre Gaultier, Thomas Minier
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
	* Method which handle the authentification of the user
	*/
	ctrl.login = function() {
		GoogleAuth.login()
		.then(function(result) {
			ctrl.is_login = true;
		}, function(error) {
			console.error(error);
		})
	}

	/*
	* Method which logout the user
	*/
	ctrl.logout = function() {
		GoogleAuth.logout();
		ctrl.is_login = false;
	}
}]);
