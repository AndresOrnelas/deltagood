var myApp = angular.module('AngularRails', [
        'ngRoute',
        'templates',
        'ngTouch',
        'ngAnimate'
    ]);
myApp.service('sharedProperties', function () {
        var protocol = {protocol1: "A"};
        var run = {run1: 1};
        var counter = {position: 0};
        var fromHome = {from: 0};
        var clocktime = {minutes: 0};

        return {
            getCounter: function(){
                return counter;
            },
            addCounter: function(){
                counter.position = counter.position + 1;
                return counter;
            },
            setCounter: function(data){
                counter.position = data;
            },
            changeCounter: function(data){
                counter.position = counter.position + data;
                return counter.position;
            },
            getProtocol: function () {
                return protocol;
            },
            setProtocol: function(value) {
                protocol.protocol1 = value;
            },
            getRun: function(){
                return run;
            },
            setRun: function(value){
                run.run1 = value;
            },
            getHome: function(){
                return fromHome;
            },
            setHome: function(data){
                fromHome.from = data;
                return fromHome;
            }, 
            getClock: function(){
                return clocktime;
            },
            setClock: function(time){
                document.getElementById("incubatortime").disabled = true;
                return $('.clock').FlipClock(time *60, {
                    countdown: true
                });
            }
        };
    });
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

myApp.config([
  "$httpProvider", function(provider) {
    return provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);
