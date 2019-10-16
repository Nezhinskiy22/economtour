var adminApp = angular.module('adminApp', ['ngRoute']);
adminApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'main.html'
        })
        .when('/countries', {
            templateUrl: 'countries.html',
            controller: 'countryListController'
        })
        .when('/tours', {
            templateUrl: 'tours.html',
            controller: 'tourListController'
        });
});