myApp.controller('NewRunCtrl', function ($scope, $location,  $http, sharedProperties) {
      
    //Initializing variables
    $scope.model = {};
    $scope.slide = 'slide-left'
    $scope.counter = sharedProperties.getCounter().position;
    $scope.count = $scope.counter;
    $scope.imgcounter = 0;
    $scope.values = [];
    $scope.imagelength = 0;
    $scope.disable = "";
    $scope.locate = sharedProperties.getProtocol();
    // Variables for pipet step
    // $scope.selectedSolutions = "duh";
    // $scope.pipetVolume = 90;

    //HARD CODED FIX THIS
    $http.get('/protocoltype.json', { params: {name: $scope.locate.protocol1}}).success(function(data){
        //General
        $scope.protocols = data;
     	$scope.numsteps = $scope.protocols.steps.length;
     	//Mechanical
      if($scope.protocols.steps[$scope.counter].type == 'mechanical'){
       	$scope.imagelinks = $scope.protocols.steps[$scope.counter].images;
       	$scope.imglink = $scope.imagelinks[$scope.imgcounter];
       	$scope.imagelength = $scope.imagelinks.length;
        $scope.percent = (($scope.counter+1)/$scope.numsteps)*100;

     }
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
        // $location.url(data);
	      $scope.counter = sharedProperties.addCounter().position;
        $scope.percent = (($scope.counter+1)/$scope.numsteps)*100;

       if($scope.protocols.steps[$scope.counter].type === 'pipet'){
            //Pipet if statement
            $scope.getSolutions();
          }

          if($scope.protocols.steps[$scope.counter].type === 'prepare'){
             $scope.getSolutions();
             $scope.getReagents();
          }
          // not even working yet
          if($scope.protocols.steps[$scope.counter-1].type === 'pipet'){
            $scope.substractQuantity();
          }
      }
	    else{
        $scope.percent = ($scope.counter/$scope.numsteps)*100;

	      	alert('Reached end of steps!');
            $location.url('/')
	    }
    }
    $scope.lastStep = function(){
    	if($scope.counter !== 0){
   			$scope.slide = 'slide-right';
      		$scope.counter = $scope.counter - 1;
      	}
    }
    $scope.visit = function(data){
      sharedProperties.setCounter();
    	$scope.slide = 'slide-left';
    	$location.url(data)
    }

    $scope.addNew = function(){
	  	$http.post('/run.json', {params: {values: $scope.values, protocol: $scope.protocols}}); 
	    $scope.protocols.counter = $scope.protocols.counter + 1;
      //need to update db with +1 to protocol counter
      $scope.slide = 'slide-right';
	  	$location.url('/')  
	    $scope.slide = 'slide-left';
	}

  $scope.startRun = function(data){
     sharedProperties.setCounter();
      $scope.slide = 'slide-left';
     // $http.post('/run.json',{params: {values: $scope.values, protocol: $scope.protocols}});
      $location.url(data)
  }

// ----------------------------------Pipet functions---------------------------------------------------------
  $scope.getSolutions = function(){
    var params = {
      params: {
        solution: $scope.protocols.steps[$scope.counter].solution
      }
    };
    console.log('getsolution');
    console.log($scope.counter);
    $http.get('/solutions.json', params).success(function(data){
      $scope.solutions = data;
      console.log($scope.solutions)
      $scope.model.selectedSolutions = $scope.solutions[0];
      $scope.model.pipetVolume = $scope.protocols.steps[$scope.counter].volume;
    });
  }

  $scope.substractQuantity = function(){
    var newVol = $scope.model.selectedSolutions.quantity - $scope.model.pipetVolume;

    solutionId = $scope.model.selectedSolutions.id;

    if (newVol < 0) {
      alert("Not Enough Solution!");
    console.log('substract');
      console.log($scope.counter);
      $scope.counter = sharedProperties.changeCounter(-1).position;
      $scope.getSolutions();
    }

    else {
      $http.post('/solutions.json', {newVolume: newVol, solutionNum: solutionId}).success(function(data){
      });
    };
  }
// ------------------------------------------------Prepate solution------------------------------------------

  $scope.getReagents = function(){


 $http.get('/solutions.json', { params: {solution: $scope.protocols.steps[$scope.counter].reagent1}}).success(function(reagents1){
    $scope.model.reagents1 = reagents1;
    $scope.model.selectedReagents1 = $scope.model.reagents1[0];
    });
 $http.get('/solutions.json', { params: {solution: $scope.protocols.steps[$scope.counter].reagent2}}).success(function(reagents2){
    $scope.model.reagents2 = reagents2;
    $scope.model.selectedReagents2 = $scope.model.reagents2[0];
    });
  }
});