/**
* @ngdoc service
* @name GalacticHorseChrome.services:SearchMerge
* @description
* A service who handle the merge of the results between the CustomSearch & the Datastore
*/
angular.module('GalacticHorseSearch.services')
.service('SearchMerge',[ "$http", "$q", function($http, $q){
    var srv = this;
    var search_endpoint_url = "https://galactic-horse.appspot.com/_ah/api/search/v1/searchUrls";
	// flag who signal if no results were found in the datastore
	var FOUND_FLAG = false;

    /*
     * Method who search the urls of the custom search dataset against the Datastore
     */
    srv.datastoreSearch = function(dataset) {
        // extract the urls from the custom search dataset
        var listUrlfromCS = [];
		var items_length = dataset.items.length;

        for (i = 0; i < items_length; i++) {
            listUrlfromCS.push(dataset.items[i].link);
        }

        // get the data from the datastore
        var deferred = $q.defer();

        $http.post(search_endpoint_url, { urls: listUrlfromCS })
        .then(function(datas) {
			// reset the FOUND_FLAG
			FOUND_FLAG = false;

            //if the result is empty, reject the promise and return the original dataset
            if(datas.data.items === undefined) {
                deferred.resolve(dataset);
            } else {
				// else, results have been found
				FOUND_FLAG = true;
				deferred.resolve(datas.data);
			}
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    }

    /**
    * Method who handle the merge between the two data-sources
    */
    srv.getMergedDatas = function(custom_search) {
        var deferred = $q.defer();
        var dataset = custom_search;

        // arrays for stocking the datas from the sort
        var tagged_datas = [];
        var non_tagged_datas = [];

        // retrieve the datas from the datastore
        srv.datastoreSearch(custom_search).then(function(datas) {
			// if some results have been found
			if(FOUND_FLAG) {
				var datastore_urls = datas.items;

				// for each url in the datastore
				datastore_urls.forEach(function(element, index, array) {
					var url = element.url;
					var tags = element.tags;

					// for each url in the custom search
					dataset.items.forEach(function(element, index, array) {
						// if the two urls matches
						if(element.link === url) {
							// we update the current item in the custom search dataset
							element.tags = tags;

							// we store the item in the tagged items' array
							tagged_datas.push(element);
						} else {
							// we store the item in the non sorted items' array
							non_tagged_datas.push(element);
						}
					});
				});

				// merge the 2 arrays & store the result
				dataset.items = tagged_datas.concat(non_tagged_datas);

				// resolve the promise
				deferred.resolve(dataset);
			} else {
				// else, we return the original dataset
				deferred.resolve(datas);
			}
        }, function(error) {
            deferred.reject(error);
        });

        return deferred.promise;
    };
}]);
