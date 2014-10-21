var trafficApp = angular.module('trafficApp', ['ngRoute', 'firebase']);

trafficApp.config(function($routeProvider) {
        $routeProvider.
//            when('/ramps', {
//                templateUrl: 'partials/ramps.html',
//                controller: 'rampsCtrl'
//            }).
//            when('/traffic', {
//                templateUrl: 'partials/traffic.html',
//                controller: 'trafficCtrl'
//            }).
            when('/data', {
                templateUrl: 'partials/data.html',
                controller: 'dataCtrl'
            }).
            when('/about', {
                templateUrl: 'partials/about.html',
                controller: 'aboutCtrl'
            }).
            when('/search', {
                templateUrl: 'partials/search.html',
                controller: 'searchCtrl'
            }).
            otherwise({
                redirectTo: '/data'
            });
});