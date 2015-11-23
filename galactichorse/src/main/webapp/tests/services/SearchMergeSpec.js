describe("SearchMerge service", function() {

	var SearchMerge, $httpBackend;
	var search_endpoint_url = "https://galactic-horse.appspot.com/_ah/api/search/v1/searchUrls";
	var dataset = {
		items : [
			{
				link : "http://www.example.org"
			},
			{
				link : "http://www.example.fr"
			}
		]
	};

	beforeEach(function () {
		module("GalacticHorseSearch.services");
	});

	beforeEach(function () {
		inject(function(_SearchMerge_, _$httpBackend_) {
			SearchMerge = _SearchMerge_;
			$httpBackend = _$httpBackend_;
		});
	});

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe("#datastoreSearch", function () {

		it("should found a matching url when there is a match", function () {
			var response = {
				"items": [
					{
						"url": "http://www.example.org",
						"tags": {
							"hello": "world"
						}
					}
				]
			};
			// mock the $http service
			$httpBackend.expectPOST(search_endpoint_url, { urls : ["http://www.example.org", "http://www.example.fr"] })
			.respond(response);

			// get the results for the method call
			var results = {};
			SearchMerge.datastoreSearch(dataset)
			.then(function(datas) {
				results = datas;
			}, function(error) {
				console.log(error);
			});
			$httpBackend.flush();

			expect(results).toEqual(response);
		});

		it("shouldn't found a matching url when there is no match", function () {
			var response = {
				data : {}
			};
			// mock the $http service
			$httpBackend.expectPOST(search_endpoint_url, { urls : ["http://www.example.org", "http://www.example.fr"] })
			.respond(response);

			// get the results for the method call
			var results = {};
			SearchMerge.datastoreSearch(dataset)
			.then(function(datas) {
				results = datas;
			}, function(error) {
				console.log(error);
			});
			$httpBackend.flush();

			expect(results).toEqual(dataset);
		});
	});

	describe("#getMergedDatas", function () {

		it("should return the original dataset when there is no match", function () {
			var response = {
				data : {}
			};
			// mock the $http service
			$httpBackend.expectPOST(search_endpoint_url, { urls : ["http://www.example.org", "http://www.example.fr"] })
			.respond(response);

			// get the results for the method call
			var results = {};
			SearchMerge.getMergedDatas(dataset)
			.then(function(datas) {
				results = datas;
			}, function(error) {
				console.log(error);
			});
			$httpBackend.flush();

			expect(results).toEqual(dataset);
		});

		it("should return a merged & sorted dataset when there is a match", function () {

			var response = {
				"items": [
					{
						"url": "http://www.example.org",
						"tags": {
							"hello": "world"
						}
					}
				]
			};
			var expected = {
				items : [
					{
						link : "http://www.example.org",
						tags : {
							hello : "world"
						}
					},
					{
						link : "http://www.example.fr"
					}
				]
			};
			// mock the $http service
			$httpBackend.expectPOST(search_endpoint_url, { urls : ["http://www.example.org", "http://www.example.fr"] })
			.respond(response);

			// get the results for the method call
			var results = {};
			SearchMerge.getMergedDatas(dataset)
			.then(function(datas) {
				results = datas;
			}, function(error) {
				console.log(error);
			});
			$httpBackend.flush();

			expect(results).toEqual(expected);
		});
	});
});
