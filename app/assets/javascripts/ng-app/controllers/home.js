var myApp = angular.module('AngularRails', []);

myApp.config([
  "$httpProvider", function(provider) {
    return provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

myApp.controller('HomeCtrl', function ($scope, $http) {
        $scope.things = ['Angular', 'Rails 4.1', 'Working', 'Together!!', 'Sara'];
        console.log("test!");
        
        $http.get('/test.json').success(function(data){
        	$scope.test = data;
        	console.log("success!");
        	console.log(data);
        });

        $http.get('/todos.json').success(function(data){
        	$scope.post = data;
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

      // $scope.todos = [];

      // $http.get('todos').success(function(todos){
      // 	$scope.todos = todos;
      // });

      $scope.addNew = function(){

      	console.log('add new todo');
      	var todo = {
      		text: $scope.todotxt,
      		done: false
      	};
      	// $scope.todos.push(todo);
      	$http.post('/todos.json',{});

      }
      console.log($scope.todos);

    });

// angular.module('AngularRails').controller('UserCtrl', function ($scope) {
//         $scope.things = ['Angular', 'Rails 4.1', 'Working', 'Together!!'];
//     });