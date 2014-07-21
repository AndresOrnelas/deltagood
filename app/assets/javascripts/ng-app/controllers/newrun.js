myApp.controller('NewRunCtrl', function ($scope, $location,  $http) {
      
    //Initializing variables
    $scope.slide = 'slide-left'
    $scope.count = $scope.counter;
    $scope.imgcounter = 0;
    $scope.values = [];
    $scope.imagelength = 0;
    $scope.disable = "";

    //HARD CODED FIX THIS
    $http.get('/protocoltype.json').success(function(data){
        //General
        $scope.protocols = data;
     	$scope.numsteps = $scope.protocols.steps.length;
     	//Mechanical
     	$scope.imagelinks = $scope.protocols.steps[$scope.counter].images;
     	$scope.imglink = $scope.imagelinks[$scope.imgcounter];
     	$scope.imagelength = $scope.imagelinks.length;
    });

	//Incubatation.html javascript
    $scope.clock = function(time){
		document.getElementById("incubatortime").disabled = true;
    	return $('.clock').FlipClock(time *60, {
			countdown: true
		});
    }

    $scope.imgMove = function(){
    	if($scope.imgcounter != $scope.imagelength-1){
	      	$scope.imgcounter = $scope.imgcounter + 1;
	      	$scope.imglink=$scope.imagelinks[$scope.imgcounter];
     	}
    }
    $scope.imgBack = function(){
    	if($scope.imgcounter != 0){
	      	$scope.imgcounter = $scope.imgcounter - 1;
	      	$scope.imglink=$scope.imagelinks[$scope.imgcounter];
     	}
    }

    //General Steps Javascript
    $scope.nextStep = function(){
		if($scope.counter !== $scope.numsteps-1){
	    	$scope.slide = 'slide-left';
	      	$scope.counter = $scope.counter + 1;
	      	if($scope.protocols.steps[$scope.counter-1].type === 'prepare'){
	      		$scope.values.push({type: 'prepare', hello: '5'});
	      	}
	    }
	    else{
	      	alert('Reached end of steps!');
	    }
    }
    $scope.lastStep = function(){
    	if($scope.counter !== 0){
   			$scope.slide = 'slide-right';
      		$scope.counter = $scope.counter - 1;
      	}
    }
    $scope.visit = function(data){
    	$scope.slide = 'slide-left';
    	$location.url(data)
    }

    $scope.addNew = function(){
	  	$http.post('/run.json',$scope.values); 
	    $scope.slide = 'slide-right';
	  	$location.url('/')  
	    $scope.slide = 'slide-left';
	}
	$scope.addCounter = function(){
  		$scope.counter = $scope.counter + 1;
	}

});