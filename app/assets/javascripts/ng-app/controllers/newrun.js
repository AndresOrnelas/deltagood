myApp.controller('NewRunCtrl', function ($scope, $location,  $http) {
      //HARD CODED FIX THIS
       $scope.values = [];
      $http.get('/protocoltype.json').success(function(data){
        	$scope.protocols = data;
     		 $scope.numsteps = $scope.protocols.steps.length;

        });
      $scope.nextStep = function(){
      	if($scope.counter !== $scope.numsteps-1){
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
      	if($scope.counter !== 0)
      	$scope.counter = $scope.counter - 1;
      }
      $scope.view = function(data){
          $location.url(data)
        }

    $scope.addNew = function(){
  	$http.post('/run.json',$scope.values); 
  	$location.url('/')       
    // $http.get('/runs.json').success(function(data){
    //   $scope.runs = data;
    // });
  }


});