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
    // Try to see what would happen if the first step is not mechanical
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
    	return $('.clock').FlipClock($scope.model.incubationTimeValue *60, {
			 countdown: true
		  });
    }
  // Mechanical.html javascript
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

        if($scope.protocols.steps[$scope.counter].type === 'incubation'){
            $scope.model.incubationTimeValue = $scope.protocols.steps[$scope.counter].time;
            $scope.model.incubationTemp = $scope.protocols.steps[$scope.counter].temp;
        }

        if($scope.protocols.steps[$scope.counter-1].type === 'pipet'){
            $scope.substractQuantity();
        }
          
      }
	   else{
        $scope.percent = ($scope.counter/$scope.numsteps)*100;
	      alert('Reached end of steps!');
        $http.post('/run.json', {params: {values: ["A"], protocol: $scope.protocols}}); 
        $location.url('/' + $scope.protocols.name)
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
      $scope.counter = sharedProperties.changeCounter(-1);
      $scope.getSolutions();
    }
    else {
      $http.post('/solutions.json', {newVolume: newVol, solutionNum: solutionId}).success(function(data){
      });
    };
  }
// ------------------------------------------------Prepate solution------------------------------------------

  $scope.getReagents = function(){
    $scope.model.quantityMadeSolution = $scope.protocols.steps[$scope.counter].suggestedQuantity;
    $scope.model.proportion1 = $scope.protocols.steps[$scope.counter].proportion1;
    $scope.model.proportion2 = $scope.protocols.steps[$scope.counter].proportion2;

    $http.get('/solutions.json', { params: {solution: $scope.protocols.steps[$scope.counter].reagent1}}).success(function(reagents1){
      $scope.model.reagents1 = reagents1;
      $scope.model.selectedReagents1 = $scope.model.reagents1[0];
     });

    $http.get('/solutions.json', { params: {solution: $scope.protocols.steps[$scope.counter].reagent2}}).success(function(reagents2){
      $scope.model.reagents2 = reagents2;
      $scope.model.selectedReagents2 = $scope.model.reagents2[0];
    });
  }

$scope.createSolution = function(){
    var newVol1 = $scope.model.selectedReagents1.quantity - $scope.model.proportion1 * $scope.model.quantityMadeSolution;
    var newVol2 = $scope.model.selectedReagents2.quantity - $scope.model.proportion2 * $scope.model.quantityMadeSolution;

    if (newVol1 < 0 || newVol2 < 0) {
     alert("Not Enough Solution!");
    }
   else {
     $http.post('/solutions.json', {newVolume: newVol1, solutionNum: $scope.model.selectedReagents1.id}).success(function(data){
     });
     $http.post('/solutions.json', {newVolume: newVol2, solutionNum: $scope.model.selectedReagents2.id}).success(function(data){
     });

     var params = {
       solution: $scope.protocols.steps[$scope.counter].solution,
       volume: $scope.model.quantityMadeSolution * ($scope.model.proportion1 + $scope.model.proportion2),
       reagents: [$scope.model.selectedReagents1.id, $scope.model.selectedReagents2.id]
     };

     $http.post('/newSolution.json', params).success(function(data){
       $scope.solutions.push(data);
       $scope.model.selectedSolutions = data;
     });
     // $scope.getSolutions();
     // //WE NEED TO DELAY THIS TO COME AFTER PREVIOUS CALL!
     // $scope.model.selectedSolutions = $scope.solutions[$scope.solutions.length-1];
   };
 }
});