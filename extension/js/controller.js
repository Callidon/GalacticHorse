"use strict";

angular.module("GalacticHorseChrome-controller", [])
  .controller("FormController", function() {
    var ctrl = this;

    ctrl.resource = {};

    ctrl.saveResource = function() {
        return true;
    };
  });
