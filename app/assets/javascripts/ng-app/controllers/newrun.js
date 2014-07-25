myApp.controller('NewRunCtrl', function ($scope, $location,  $http, sharedProperties) {
      
    //Initializing variables
    $scope.model = {};
    $scope.slide = 'slide-left'
    $scope.counter = sharedProperties.getCounter().position;
    $scope.count = $scope.counter;
    $scope.imgcounter = 0;
    $scope.imagelength = 0;
    $scope.disable = "";
        console.log("hahahahahahahahah")

    $scope.locate = sharedProperties.getProtocol();
    // Try to see what would happen if the first step is not mechanical
    if(sharedProperties.getHome().from == 1){
      $http.get('/protocoltype.json', { params: {name: $scope.locate.protocol1}}).success(function(data){
        $scope.protocols = data;
        console.log("from home")
      });
    }
    else{
    $http.get('/runtype.json', { params: {id: sharedProperties.getRun().run1}}).success(function(data){
      $scope.protocols = data;
      $scope.startVoiceRecognition();
      $scope.numsteps = $scope.protocols.inputs.length;
        $scope.values = $scope.protocols.inputs;

        //Mechanical
        if($scope.protocols.inputs[$scope.counter].type == 'mechanical'){
          $scope.imagelinks = $scope.protocols.inputs[$scope.counter].images;
          $scope.imglink = $scope.imagelinks[$scope.imgcounter];
          $scope.imagelength = $scope.imagelinks.length;
          $scope.percent = (($scope.counter+1)/$scope.numsteps)*100;
        }
        $scope.prepareEverything();
    });
  }

	//Incubatation.html javascript
    // $scope.clock = function(time){
		  // document.getElementById("incubatortime").disabled = true;
    // 	return $('.clock').FlipClock($scope.model.incubationTimeValue *60, {
			 // countdown: true
		  // });
    // }
    $scope.clock = function(){
      sharedProperties.setClock($scope.model.incubationTimeValue);
    };
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
    if($scope.protocols.inputs[$scope.counter].type === 'mechanical'){
    }
    else if($scope.protocols.inputs[$scope.counter].type === 'incubation'){
        $scope.values[$scope.counter].temp = $scope.model.incubationTemp;
        $scope.values[$scope.counter].time = $scope.model.incubationTimeValue;
    }
    else if($scope.protocols.inputs[$scope.counter].type === 'pipet'){
        $scope.values[$scope.counter].usedSolution = $scope.model.selectedSolutions.id;
        $scope.values[$scope.counter].volume = $scope.model.pipetVolume;
    }
    else if($scope.protocols.inputs[$scope.counter].type === 'prepare'){
        $scope.values[$scope.counter].usedSolution = $scope.model.selectedSolutions.id;
    }

    $http.post('/runupdate.json', {values: $scope.values, id: sharedProperties.getRun().run1, currentStep: $scope.counter+1}); 
    $scope.protocols.inputs = $scope.values;

		if($scope.counter !== $scope.numsteps-1){
	    	$scope.slide = 'slide-left';
        // $location.url(data);

	      $scope.counter = sharedProperties.addCounter().position;
        $scope.percent = (($scope.counter+1)/$scope.numsteps)*100;

        $scope.prepareEverything();
      }
	   else{
        $scope.percent = ($scope.counter/$scope.numsteps)*100;
	      alert('Reached end of steps!');
        // $http.post('/run.json', {params: {values: ["A"], protocol: $scope.protocols}}); 
        $location.url('/' + $scope.protocols.protocolName)
	    }

    }

    $scope.prepareEverything = function(){
      if($scope.protocols.inputs[$scope.counter].type === 'pipet'){
            //Pipet if statement
            $scope.getSolutions();
        }
        if($scope.protocols.inputs[$scope.counter].type === 'prepare'){
             $scope.getSolutions();
             $scope.getReagents();
        }
        if($scope.protocols.inputs[$scope.counter].type === 'incubation'){
            $scope.model.incubationTimeValue = $scope.protocols.inputs[$scope.counter].time;
            $scope.model.incubationTemp = $scope.protocols.inputs[$scope.counter].temp;
        }
        if($scope.counter-1 >= 0){
          if($scope.protocols.inputs[$scope.counter-1].type === 'pipet'){
              $scope.substractQuantity();
          } 
        }
    }
    $scope.lastStep = function(){

if($scope.protocols.inputs[$scope.counter].type === 'mechanical'){
    }
    else if($scope.protocols.inputs[$scope.counter].type === 'incubation'){
        $scope.values[$scope.counter].temp = $scope.model.incubationTemp;
        $scope.values[$scope.counter].time = $scope.model.incubationTimeValue;
    }
    else if($scope.protocols.inputs[$scope.counter].type === 'pipet'){
        $scope.values[$scope.counter].usedSolution = $scope.model.selectedSolutions.id;
        $scope.values[$scope.counter].volume = $scope.model.pipetVolume;
    }
    else if($scope.protocols.inputs[$scope.counter].type === 'prepare'){
        $scope.values[$scope.counter].usedSolution = $scope.model.selectedSolutions.id;
    }

    $http.post('/runupdate.json', {values: $scope.values, id: sharedProperties.getRun().run1, currentStep: $scope.counter+1}); 
    $scope.protocols.inputs = $scope.values;

    if($scope.counter !== 0){
        $scope.slide = 'slide-right';
        $scope.counter = sharedProperties.changeCounter(-1);

        $scope.percent = (($scope.counter+1)/$scope.numsteps)*100;

        $scope.prepareEverything();
      }
     else{
        $scope.percent = ($scope.counter/$scope.numsteps)*100;
        alert('Reached end of steps!');
        // $http.post('/run.json', {params: {values: ["A"], protocol: $scope.protocols}}); 
        $location.url('/' + $scope.protocols.protocolName)
      }




    }
$scope.startRun = function(data){
      sharedProperties.setCounter(0);
      sharedProperties.setHome(0);
      $scope.slide = 'slide-left';
      $http.post('/run.json',{protocolid: $scope.protocols.id, protocolName: $scope.protocols.name, steps: $scope.protocols.steps});
     //saves the run into services to be accessed when i want to update runs
      $http.get('/lastrun.json', {params: {id: $scope.protocols.id}}).success(function(data1){
          sharedProperties.setRun(data1.id);
          console.log(sharedProperties.getRun().run1);
          $location.url(data)
      });
      // if(sharedProperties.getRun().run1 != 1) THIS WAS
  }

    $scope.visit = function(data){
        sharedProperties.setCounter(0);
      $scope.slide = 'slide-left';
      $location.url(data)
    }

  

// ----------------------------------Pipet functions---------------------------------------------------------
  $scope.getSolutions = function(){
    var params = {
      params: {
        solution: $scope.protocols.inputs[$scope.counter].solution
      }
    };
    $http.get('/solutions.json', params).success(function(data){
      $scope.solutions = data;
      console.log($scope.solutions)
      $scope.model.selectedSolutions = $scope.solutions[0];
      $scope.model.pipetVolume = $scope.protocols.inputs[$scope.counter].volume;
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
    $scope.model.quantityMadeSolution = $scope.protocols.inputs[$scope.counter].suggestedQuantity;
    $scope.model.proportion1 = $scope.protocols.inputs[$scope.counter].proportion1;
    $scope.model.proportion2 = $scope.protocols.inputs[$scope.counter].proportion2;

    $http.get('/solutions.json', { params: {solution: $scope.protocols.inputs[$scope.counter].reagent1}}).success(function(reagents1){
      $scope.model.reagents1 = reagents1;
      $scope.model.selectedReagents1 = $scope.model.reagents1[0];
     });

    $http.get('/solutions.json', { params: {solution: $scope.protocols.inputs[$scope.counter].reagent2}}).success(function(reagents2){
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
       solution: $scope.protocols.inputs[$scope.counter].solution,
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