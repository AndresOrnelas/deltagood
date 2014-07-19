myApp.controller('NewRunCtrl', function ($scope, $location,  $http) {
      //HARD CODED FIX THIS
      $http.get('/protocoltype.json').success(function(data){
        	$scope.protocols = data;
        });

      $scope.view = function(data){
          $location.url(data)
        }

       
});