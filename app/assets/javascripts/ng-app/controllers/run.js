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

    $scope.visit = function(data, id){    
        sharedProperties.setRun(id);
        $location.url(data)
    }
});