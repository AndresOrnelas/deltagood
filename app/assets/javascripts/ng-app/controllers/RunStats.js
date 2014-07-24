myApp.controller('RunStatsCtrl', function ($scope, $location, $http, sharedProperties) {
      $scope.locate = sharedProperties.getRun();
    	$scope.slide = 'slide-left';

    	$http.get('/runtype.json', 
    		{ params: {id: $scope.locate.run1}}).success(function(data){
    			$scope.run = data;
          $scope.steps = $scope.run.steps;
          $scope.note = $scope.steps.splice($scope.steps.length-1);
    		})

       $scope.view = function(data){
          $location.url(data)
        }
    });