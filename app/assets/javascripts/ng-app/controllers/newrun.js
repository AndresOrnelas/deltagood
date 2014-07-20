myApp.controller('NewRunCtrl', function ($scope, $location,  $http) {
      //HARD CODED FIX THIS
      $scope.slide = 'slide-left'
      // if($scope.slide === 'slide-left'){
      // 	$scope.slide = 'slide-left'
      // }
      // if($scope.slide === 'slide-right'){
      // 	$scope.slide - 'slide-right'
      // }
      $scope.count = $scope.counter;
       $scope.values = [];
      $http.get('/protocoltype.json').success(function(data){
        	$scope.protocols = data;
     		 $scope.numsteps = $scope.protocols.steps.length;

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
    $scope.slide = 'slide-left';
  	$location.url('/')       
    // $http.get('/runs.json').success(function(data){
    //   $scope.runs = data;
    // });
  }
  $scope.addCounter = function(){
  	$scope.counter = $scope.counter + 1;
  }

});