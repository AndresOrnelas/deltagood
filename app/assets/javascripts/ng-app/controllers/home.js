var myApp = angular.module('AngularRails', []);

myApp.controller('HomeCtrl', function ($scope, $http) {
        $scope.things = ['Angular', 'Rails 4.1', 'Working', 'Together!!', 'Sara'];
        console.log("test!");
        
        $http.get('/test.json').success(function(data){
        	$scope.test = data;
        	console.log("success!");
        	console.log(data);
        });

      $scope.list = [];
      $scope.text = 'hello';
      $scope.submit = function() {
        if ($scope.text) {
          $scope.list.push(this.text);
          $scope.text = '';
        }
      };

      $http.get('todos').success(function(todos){
      	$scope.todos = todos;
      });

      $scope.addNew = function(){

      	console.log('add new todo'); 
      	var todo = {
      		text: $scope.todotxt,
      		done: false
      	}
      	$scope.todos.push(todo);
      	$http.post('/todos',todo);

      }
      console.log($scope.todos);

    });

// angular.module('AngularRails').controller('UserCtrl', function ($scope) {
//         $scope.things = ['Angular', 'Rails 4.1', 'Working', 'Together!!'];
//     });