myApp.controller('RunCtrl', function ($scope, $routeParams, $http, $location, sharedProperties) {
	$scope.locate = sharedProperties.getProtocol();
    $scope.slide = 'slide-left'
    $http.get('/run.json').success(function(data){
        $scope.runs = data;
    });

    $http.get('/user.json').success(function(data){
    	$scope.users = data;
    });
     $http.get('/protocol.json').success(function(data){
    	$scope.protocols = data;
    });

    $scope.visit = function(id){    
        sharedProperties.setRun(id);
        // $http.get('/runtype.json', {params: {id: id}}).success(function(data){
        //     $scope.currentrun = data;
        // });

        // if($scope.currentrun.currentStep < $scope.currentrun.inputs.length-1){
        //     $location.url('/newrun'+ 
        // }
        // else{

        // }
        // //if <100 go to steps
        // //else go to statistics
        $location.url('/'+ $scope.locate.protocol1 +'/'+ id)

    }
});