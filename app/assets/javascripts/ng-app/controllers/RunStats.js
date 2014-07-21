myApp.controller('RunStatsCtrl', function ($scope, $location,  $http) {
       $scope.view = function(data){
          $location.url(data)
        }
    });