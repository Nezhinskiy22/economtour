adminApp.controller('tourListController', [
    '$scope', '$http',
    function($scope, $http) {
        $scope.model = {};
        //$scope.model.countries = [];
        $scope.getCountries = getCountries;

        //----------------------------------
        function getCountries() {
            $http.get('/api/v1/countries')
                .then(function(response) {
                    $scope.model.countries = response.data;
                }, function(response) {
                    $scope.model.countries = 'Error: ' + response.data.message;
                });
        }
    }
])