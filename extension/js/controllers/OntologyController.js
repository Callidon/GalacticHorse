/**
 * @ngdoc controller
 * @name GalacticHorseChrome.controllers:OntologyController
 * @description
 * A controller who handle the display of the ontology
 */
angular.module("GalacticHorseChrome.controllers")
  .controller("OntologyController", [ "OntologySelection", function(OntologySelection) {
    var ctrl = this;

    // TODO replace with fetch by $http
    var elements = {
      subCategories : [
        {
          name: "Sub Category A",
          content: {
            subCategories : [
              {
                name: "Sub Category B",
                content: {
                  subCategories : [],
                  elements : [
                    {
                      id: 3,
                      name: "Handicap D"
                    }
                  ]
                }
              }
            ],
            elements : [
              {
                id: 2,
                name: "Handicap C"
              }
            ]
          }
        }
      ],
      elements : [
        {
          id: 0,
          name: "Handicap A"
        },
        {
          id: 1,
          name: "Handicap B"
        }
      ]
    };

    ctrl.currentSubCategories = elements.subCategories;
    ctrl.currentElt = elements.elements;
    ctrl.previous = [];

    /*
     * Method who add an ontology element to the selection
     */
    ctrl.add = function(elt) {
      OntologySelection.add(elt);
    }

    /*
     * Method who check if an elemnt is in the selection
     */
    ctrl.isSelected = function(elt) {
      return OntologySelection.isSelected(elt);
    }

    /*
     * Method who naviaget to a sub category
     */
    ctrl.navigate = function(subCategory) {
      // push the current state in list of previous states
      ctrl.previous.push({
        subCategories : ctrl.currentSubCategories,
        elements : ctrl.currentElt
      });
      // update the current state with the new content
      ctrl.currentElt = subCategory.content.elements;
      ctrl.currentSubCategories = subCategory.content.subCategories;
    }

    /*
     * Method who go back to the previous sub category
     */
    ctrl.goBack = function() {
      // retrieve the previous state from the list
      var length = ctrl.previous.length;

      // if a previous state exist
      if(length > 0) {
        var lastState = ctrl.previous[length - 1];

        // update the current state with the new content
        ctrl.currentElt = lastState.elements;
        ctrl.currentSubCategories = lastState.subCategories;

        // delete the state from the list of previous state
        ctrl.previous.splice(length - 1, 1);
      }
    }
  }]);
