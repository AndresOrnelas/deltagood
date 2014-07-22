var myApp = angular.module('AngularRails', [
        'ngRoute',
        'templates',
        'ngTouch',
        'ngAnimate'
    ]);

myApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'test.html',
                controller: 'HomeCtrl'
            });
            $routeProvider
            .when('/newrun/:protocol', {
                templateUrl: 'newrun.html',
                controller: 'NewRunCtrl'
            });
            $routeProvider
            .when('/newrun/:protocol/:steps', {
                templateUrl: 'RunSteps.html',
                controller: 'NewRunCtrl'
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
                templateUrl: 'runstats.html',
                controller: 'RunStatsCtrl'
            });
            
            $routeProvider
            .otherwise('/', {
                templateUrl: 'test.html',
                controller: 'HomeCtrl'
            });


        $locationProvider.html5Mode(false);
    });