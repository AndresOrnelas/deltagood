myApp.controller('NewRunCtrl', function ($scope, $location,  $http) {
      
    //Initializing variables
    $scope.slide = 'slide-left'
    $scope.count = $scope.counter;
    $scope.imgcounter = 0;
    $scope.values = [];
    $scope.imagelength = 0;
    $scope.disable = "";
    $scope.locate = $location.path().substring(8,9);
    // Variables for pipet step
    $scope.selectedSolutions = 90;
    $scope.pipetVolume = 90;

    // $scope.$watch('selectedSolutions', function(nVal, oVal){});
    // $scope.$watch('pipetVolume', function(nVal, oVal){
    //   $scope.pipetVolume = 
    // });

    //HARD CODED FIX THIS
    $http.get('/protocoltype.json', { params: {name: $scope.locate}}).success(function(data){
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
	      	// if($scope.protocols.steps[$scope.counter-1].type === 'prepare'){
	      	// 	$scope.values.push({type: 'prepare', hello: '5'});
        //   }
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
//  we no longer use this function anymore, we replaced it in swipe left with nextStep()
	}

// ----------------------------------Pipet functions---------------------------------------------------------
  $scope.getSolutions = function(){
    $http.get('/solutions.json', { params: {solution: $scope.protocols.steps[$scope.counter].solution}} ).success(function(data){
    $scope.solutions = data;
    $scope.selectedSolutions = $scope.solutions[0];
    $scope.pipetVolume = $scope.protocols.steps[$scope.counter].volume;

    });
  }

  $scope.substractQuantity = function(){
    // We need to be able to get this element
    var newVol = $scope.selectedSolutions.quantity - $scope.pipetVolume;
    // alert($scope.selectedSolutions)
    if (newVol < 0) {
      alert("Not Enough Solution!");
      $scope.counter = $scope.counter- 1;
    }

    else {
      $http.post('/solutions.json', { params: {newVolume: newVol}} ).success(function(data){
      });
    };
  }
// ------------------------------------------------Prepate solution------------------------------------------

  $scope.getReagents = function(){
 $http.get('/solutions.json', { params: {solution: $scope.protocols.steps[$scope.counter].reagent1}}).success(function(reagents1){
    $scope.reagents1 = reagents1;
    $scope.selectedReagents1 = $scope.reagents1[0];
    });
 $http.get('/solutions.json', { params: {solution: $scope.protocols.steps[$scope.counter].reagent2}}).success(function(reagents2){
    $scope.reagents2 = reagents2;
    $scope.selectedReagents2 = $scope.reagents2[0];
    });
  }

  // $scope.resetDiv = function(){
  //   $scope.selectedSolutions = $scope.solutions[0];
  //   alert($scope.selectedSolutions);


  // }

});