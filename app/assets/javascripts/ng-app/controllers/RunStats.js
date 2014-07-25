myApp.controller('RunStatsCtrl', function ($routeParams, $scope, $location, $http, sharedProperties) {
      $scope.locate = sharedProperties.getRun();
    	$scope.slide = 'slide-left';

      $http.get('/protocoltype.json', 
        { params: {name: sharedProperties.getProtocol().protocol1}}).success(function(data){
          $scope.protocols = data;
        })

    	$http.get('/runtype.json', 
    		{ params: {id: $routeParams.run}}).success(function(data){
    			$scope.run = data;
           $scope.steps = $scope.run.inputs;
           $scope.note = $scope.steps[$scope.steps.length-1];
           $scope.steps.splice($scope.steps.length-1);
    		})

       $scope.view = function(data){
          $location.url(data)
        }
    });