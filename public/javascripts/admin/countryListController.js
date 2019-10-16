adminApp.controller('countryListController', [
    '$scope', '$http',
    function($scope, $http) {
        $scope.model = {};
        //$scope.model.countries = [];
        $scope.getCountries = getCountries;
        $scope.removeCountry = removeCountry;
        $scope.editCountry = editCountry;
        $scope.updateCountry = updateCountry;
        $scope.model.removeSuccessMsg = '';
        $scope.model.removeErrorMsg = '';
        $scope.model.Description = '';

        //----------------------------------
        function getCountries() {
            $http.get('/api/v1/countries')
                .then(function(response) {
                    $scope.model.countries = response.data;
                }, function(response) {
                    $scope.model.countries = 'Error: ' + response.data.message;
                });
        }

        function editCountry(id) {
            $http.get('api/v1/country/' + id)
                .then(function(country) {
                    $scope.model.countryId = country.data._id;
                    $scope.model.Description = country.data.countryDsc;
                })
                .catch(function(response) {
                    console.error(response);
                });
        }

        function updateCountry() {
            let data = {
                countryDsc: $scope.model.Description
            };

            $http.put('api/v1/country/' + $scope.model.countryId, data)
                .then(function(response) {
                    getCountries();
                })
                .catch(function(response) {
                    alert(response);
                });
        }

        function removeCountry(id) {
            $http.delete('api/v1/country/' + id)
                .then(function(response) {
                    $scope.model.removeSuccessMsg = 'Країна видалена успішно!';
                    getCountries();
                })
                .catch(function(response) {
                    $scope.model.removeErrorMsg = 'Країну не видалено!';
                });
        }

        //----------------------------------
        getCountries();
    }
]);