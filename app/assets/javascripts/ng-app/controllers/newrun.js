myApp.controller('NewRunCtrl', function ($scope, $location,  $http) {
      
    //Initializing variables

    $scope.model = {};
    $scope.slide = 'slide-left'
    $scope.count = $scope.counter;
    $scope.imgcounter = 0;
    $scope.values = [];
    $scope.imagelength = 0;
    $scope.disable = "";
    $scope.locate = $location.path().substring(8,9);
    // Variables for pipet step
    
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
    var params = {
      params: {
        solution: $scope.protocols.steps[$scope.counter].solution
      }
    };
    console.log('getsolution');
    console.log($scope.counter);
    $http.get('/solutions.json', params).success(function(data){
      $scope.solutions = data;
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
      $scope.counter = $scope.counter-1;
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
    // $scope.model.proportion1 = $scope.protocols.steps[$scope.counter]
    });
 $http.get('/solutions.json', { params: {solution: $scope.protocols.steps[$scope.counter].reagent2}}).success(function(reagents2){
    $scope.model.reagents2 = reagents2;
    $scope.model.selectedReagents2 = $scope.model.reagents2[0];
    });
 $scope.model.proportion1 = $scope.protocols.steps[$scope.counter].proportion1;
 $scope.model.proportion2 = $scope.protocols.steps[$scope.counter].proportion2;
 $scope.model.quantityMadeSolution = $scope.protocols.steps[$scope.counter].suggestedQuantity;
  }

//none of this is tested...
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
      });
      $scope.getSolutions();
      //WE NEED TO DELAY THIS TO COME AFTER PREVIOUS CALL!
      $scope.model.selectedSolutions = $scope.solutions[$scope.solutions-1];
    };

  }

  // $scope.resetDiv = function(){
  //   $scope.selectedSolutions = $scope.solutions[0];
  //   alert($scope.selectedSolutions);


  // }

});