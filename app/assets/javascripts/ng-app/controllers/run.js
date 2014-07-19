myApp.controller('RunCtrl', function ($scope, $routeParams, $http, $location) {
		$scope.locate = $location.path().substring(1);
        $http.get('/user.json').success(function(data){
        	$scope.users = data;
        });
         $http.get('/protocol.json').success(function(data){
        	$scope.protocols = data;
        });
         $scope.visit = function(data){
          $location.url(data)
        }

		// var send = {
		// 	name: $location.path().substring(1)
		// };
		
        // $http.post('/run.json',send);        

        $http.get('/run.json').success(function(data){
        	$scope.runs = data;
        });

        	
    });