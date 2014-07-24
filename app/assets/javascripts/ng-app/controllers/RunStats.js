myApp.controller('RunStatsCtrl', function ($scope, $location, $http, sharedProperties) {
      $scope.locate = sharedProperties.getRun();
    	$scope.slide = 'slide-left';
      $scope.runInfo = {note: ""};

    	$http.get('/runtype.json', 
    		{ params: {id: $scope.locate.run1}}).success(function(data){
    			$scope.run = data;
          $scope.steps = $scope.run.steps
    		})

       $scope.view = function(data){
          $location.url(data)
        }
    });