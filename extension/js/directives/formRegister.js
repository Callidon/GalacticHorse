/**
 * @ngdoc directive
 * @name GalacticHorseChrome.directives:formRegister
 * @scope
 * @restrict E
 * @description
 * A form that an user can use to register a website
 */
angular.module("GalacticHorseChrome.directives")
    .directive("formRegister", function() {
        return {
            restrict: "E",
            templateUrl: "partials/formRegister.html",
            controller: "FormController as formCtrl"
        }
    });
