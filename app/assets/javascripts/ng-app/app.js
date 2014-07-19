var myApp = angular.module('AngularRails', [
        'ngRoute',
        'templates',
        'ngTouch'
    ]);

myApp.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'test.html',
                controller: 'HomeCtrl'
            });
            $routeProvider
            .when('/tim', {
                templateURL: 'templates/tim.html',
                controller: 'HomeCtrl'});
          
        $locationProvider.html5Mode(true);
    });

myApp.config([
  "$httpProvider", function(provider) {
    return provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);