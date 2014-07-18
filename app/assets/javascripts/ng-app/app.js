var myApp = angular.module('AngularRails', [
        'ngRoute',
        'templates'
    ]);

myApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'test.html',
                controller: 'HomeCtrl'
            });
            // $routeProvider
            // .when('/tim', {
            //     templateURL: 'templates/tim.html',
            //     controller: 'HomeCtrl'});
            $routeProvider
            .when('/tim', {
                templateUrl: 'tim.html',
                controller: 'HomeCtrl'
            });
          
        $locationProvider.html5Mode(true);
    });