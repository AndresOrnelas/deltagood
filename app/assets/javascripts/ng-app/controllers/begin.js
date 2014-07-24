myApp.controller('BeginCtrl', function ($scope, $location,  $http, sharedProperties) {
	$scope.model = {};
    $scope.slide = 'slide-left'
    $scope.counter = sharedProperties.getCounter().position;
    $scope.count = $scope.counter;
    $scope.imgcounter = 0;
    $scope.imagelength = 0;
    $scope.disable = "";
    $scope.locate = sharedProperties.getProtocol();
	$http.get('/protocoltype.json', { params: {name: $scope.locate.protocol1}}).success(function(data){
        $scope.protocols = data;
    });

    $scope.startRun = function(data){
    	sharedProperties.setCounter(0);
    	$scope.slide = 'slide-left';
    	$http.post('/run.json',{protocolid: $scope.protocols.id, protocolName: $scope.protocols.name, steps: $scope.protocols.steps});
     //saves the run into services to be accessed when i want to update runs
   		$http.get('/lastrun.json', {params: {id: $scope.protocols.id}}).success(function(data){
   			console.log("henok1");
        	sharedProperties.setRun(data.id);
        	console.log(sharedProperties.getRun().run1);
    	});
    	if(sharedProperties.getRun().run1 != 1)
    		$location.url(data)
 	}

    $scope.visit = function(data){
      	sharedProperties.setCounter(0);
    	$scope.slide = 'slide-left';
    	$location.url(data)
    }


});