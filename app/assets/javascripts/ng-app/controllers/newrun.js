myApp.controller('NewRunCtrl', function ($scope, $location,  $http) {
      
      $scope.slide = 'slide-left'
      $scope.count = $scope.counter;
      $scope.imgcounter = 0;
      $scope.values = [];
      $scope.imagelength = 0;

      //HARD CODED FIX THIS
      $http.get('/protocoltype.json').success(function(data){
        	$scope.protocols = data;
     		 $scope.numsteps = $scope.protocols.steps.length;
     		 $scope.imagelinks = $scope.protocols.steps[$scope.counter].images;
     		 $scope.imglink = $scope.imagelinks[$scope.imgcounter];
     		 $scope.imagelength = $scope.imagelinks.length;
        });
      $scope.nextStep = function(){
      	if($scope.counter !== $scope.numsteps-1){
    		$scope.slide = 'slide-left';
      		$scope.counter = $scope.counter + 1;
      		if($scope.protocols.steps[$scope.counter-1].type === 'prepare'){
      			$scope.values.push({type: 'prepare', hello: '5'});
      		}

  		// $location.url('/newrun/'+$scope.protocols.name + '/1')       


      	}
      	else{
      			alert('Reached end of steps!');
      		}

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

    // $http.get('/runs.json').success(function(data){
    //   $scope.runs = data;
    // });
  }
  $scope.addCounter = function(){
  	$scope.counter = $scope.counter + 1;
  }

});