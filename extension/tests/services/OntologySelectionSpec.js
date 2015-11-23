describe("OntologySelection service", function() {

	var OntologySelection;

	beforeEach(function () {
	  module("GalacticHorseChrome.services");
	});

	beforeEach(function () {
	  inject(function(_OntologySelection_) {
		 OntologySelection = _OntologySelection_;

		 // reseting the elements of the selection before each test
		 OntologySelection.elements = [];
	  });
	});


	describe("#add", function () {

		it("should add an element in the selection", function () {
			var elt = {
				id : "1",
				name : "foo"
			};

			OntologySelection.add(elt);
			expect(OntologySelection.elements).toContain(elt);
		});

		it("shouldn't allow the insertion of duplicated elements", function() {
			var elt = {
				id : "1",
				name : "foo"
			};

			OntologySelection.add(elt);
			OntologySelection.add(elt);

			expect(OntologySelection.elements).toContain(elt);
			expect(OntologySelection.elements.length).toBe(1);
		});

	});

	describe("#remove", function () {

		it("should remove an element inserted previously", function () {
			var elt = {
				id : "1",
				name : "foo"
			};

			OntologySelection.add(elt);
			OntologySelection.remove(elt);

			expect(OntologySelection.elements).not.toContain(elt);
		});

		it("shouldn't do anything when trying to remove an non-existent element", function() {
			OntologySelection.remove(1);
		});

	});

	describe("#isSelected", function () {

		it("should detect if an element is in the selection or not", function () {
			var elt = {
				id : "1",
				name : "foo"
			};

			OntologySelection.add(elt);

			expect(OntologySelection.isSelected(elt)).toBe(true);
			expect(OntologySelection.isSelected(129)).toBe(false);
		});
	});

	describe("#export", function () {

		it("should export the selection with the correct format", function () {
			var eltA = {
				id : "1",
				name : "foo"
			};

			var eltB = {
				id: "2",
				name: "bar"
			};
			OntologySelection.add(eltA);
			OntologySelection.add(eltB);

			var selection = OntologySelection.export();

			expect(selection["1"]).toBe("foo");
			expect(selection["2"]).toBe("bar");
		});

	});

});
