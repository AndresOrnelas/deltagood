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
            .when('/:protocol', {
                templateUrl: 'protocol.html',
                controller: 'RunCtrl'
            });
            $routeProvider
            .when('/:protocol/:run', {
                templateUrl: 'steps.html',
                controller: 'StepCtrl'
            });
        $locationProvider.html5Mode(true);
    });