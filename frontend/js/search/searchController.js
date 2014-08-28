angular.module('sklaidaApp')
    .controller('searchController', ['$scope', '$window', 'searchService',
        function SearchController($scope, $window, searchService) {
            $scope.results = [];
            $scope.busy = false;
            $scope.init = function() {
                $scope.fieldsToSubmit = {
                    SearchType: "Template",
                    DesiredDeliveryDate: formatDate(new Date())
                }
            }
            $scope.submit = function() {
                $scope.busy = true;
                $scope.results = [];
                searchService.search($scope.fieldsToSubmit, searchCompleted);
            }
            $scope.followLink = function(result){
                if(result.data.clickThroughUrl){
                    $window.location.href = result.data.clickThroughUrl;
                }
            }
            $scope.setSortByField = function(sortByField){
                $scope.fieldToSortBy = sortByField;
                $scope.reverseSort = !$scope.reverseSort;
            }

            function searchCompleted(err, response) {
                $scope.busy = true;
                searchService.pollForResults(response.Location, resultsReturned);
            }

            function resultsReturned(err, e) {
                $scope.busy = false;
                if(!e) return;
                $scope.results.push({
                    data: e.data,
                    type: e.eventType
                });
            }

            function formatDate(dateToFormat) {
                var date = dateToFormat.getDate();
                var month = dateToFormat.getMonth() + 1;
                var year = dateToFormat.getFullYear();
                return date + "/" + month + "/" + year;
            }
        }
    ]);
