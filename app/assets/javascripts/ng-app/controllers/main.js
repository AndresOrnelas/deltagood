myApp.controller('MainCtrl', function ($scope, $location,  $http, sharedProperties) {
	$scope.clock = function(time){
		  document.getElementById("incubatortime").disabled = true;
    	return $('.clock').FlipClock($scope.model.incubationTimeValue *60, {
			 countdown: true
		  });
    }
});