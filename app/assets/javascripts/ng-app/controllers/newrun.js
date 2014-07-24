myApp.controller('NewRunCtrl', function ($scope, $location,  $http, sharedProperties) {
      
    //Initializing variables
    $scope.model = {};
    $scope.slide = 'slide-left'
    $scope.counter = sharedProperties.getCounter().position;
    $scope.count = $scope.counter;
    $scope.imgcounter = 0;
    $scope.imagelength = 0;
    $scope.disable = "";
    $scope.locate = sharedProperties.getProtocol();
    // Try to see what would happen if the first step is not mechanical

    // $http.get('/runtype.json', { params: {name: $scope.locate.protocol1}}).success(function(data){
      
    // if the currentStep is 0
    $http.get('/protocoltype.json', { params: {name: $scope.locate.protocol1}}).success(function(data){
      //General
      $scope.protocols = data;
     	$scope.numsteps = $scope.protocols.steps.length;
      $scope.values = $scope.protocols.steps;

     	//Mechanical
      if($scope.protocols.steps[$scope.counter].type == 'mechanical'){
       	$scope.imagelinks = $scope.protocols.steps[$scope.counter].images;
       	$scope.imglink = $scope.imagelinks[$scope.imgcounter];
       	$scope.imagelength = $scope.imagelinks.length;
        $scope.percent = (($scope.counter+1)/$scope.numsteps)*100;
      }
      //ADD IF STATEMENT IF WE START ON A PIPET OR PREPARE STEP
    });
   // else
    //  get request from /runtype and set $scope.protocols = run

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
    if($scope.protocols.steps[$scope.counter].type === 'mechanical'){
    }
    else if($scope.protocols.steps[$scope.counter].type === 'incubation'){
        $scope.values[$scope.counter].temp = $scope.model.incubationTemp;
        $scope.values[$scope.counter].time = $scope.model.incubationTimeValue;
    }
    else if($scope.protocols.steps[$scope.counter].type === 'pipet'){
        $scope.values[$scope.counter].usedSolution = $scope.model.selectedSolutions.id;
        $scope.values[$scope.counter].volume = $scope.model.pipetVolume;
    }
    else if($scope.protocols.steps[$scope.counter].type === 'prepare'){
        $scope.values[$scope.counter].usedSolution = $scope.model.selectedSolutions.id;
    }

    $http.post('/runupdate.json', {values: $scope.values, id: sharedProperties.getRun().run1}); 
    $scope.protocols.steps = $scope.values;

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
        // $http.post('/run.json', {params: {values: ["A"], protocol: $scope.protocols}}); 
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
          $scope.startVoiceRecognition();

     sharedProperties.setCounter();
      $scope.slide = 'slide-left';
     $http.post('/run.json',{protocolid: $scope.protocols.id});
     //saves the run into services to be accessed when i want to update runs
    $http.get('/lastrun.json', {params: {id: $scope.protocols.id}}).success(function(data){
        sharedProperties.setRun(data.id);
    });
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

$scope.okToGo = true;
 $scope.startVoiceRecognition = function(){
  if (!('webkitSpeechRecognition' in window)) {
    console.log("No speech recognition. Please upgrade your browser")
  } else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;  // false => only sends isFinal results...

    recognition.onstart = function() { console.log("Voice Recognition Starting.") }
    recognition.onresult = function(event) { 
      if($scope.okToGo){
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          res = event.results[i];
          console.log(res);
        for (var j = 0; j < res.length; j++){
          console.log(res[j].transcript);
          console.log(res[j].confidence);
            if (res[j].transcript.indexOf("continue") > -1) {
              console.log("Voice Recognition Successful: Continue")
              $scope.okToGo = false;
              console.log("Let's wait 8 seconds before accepting speech again.");
              window.setTimeout(function(){
                $scope.okToGo = true;
                console.log("Ready. Set. Go... Talk away!");
              },5000);
              document.getElementById('nextstep').click();
            } else if(res[j].transcript.indexOf("go back") > -1) {
              console.log("Voice Recognition Successful: Go Back");
              $scope.okToGo = false;
              console.log("Let's wait 8 seconds before accepting speech again.");
              window.setTimeout(function(){
               $scope.okToGo = true;
                console.log("Ready. Set. Go... Talk away!");
              },5000);
              document.getElementById('goback').click();

            }
          }
        }
      } else {
        console.log("Request ignored. Waiting for the ok to continue...")
      }
    }
    recognition.onerror = function(event) { console.log("Error!") }
    recognition.onend = function() { 
      console.log("Voice Recognition Ending. Over and out.") ;
    }
  }
    recognition.lang = "en-US";
    recognition.start();
 }
});