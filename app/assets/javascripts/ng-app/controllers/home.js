myApp.config([
  "$httpProvider", function(provider) {
    return provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

myApp.controller('HomeCtrl', function ($scope, $location, $http) {
        $scope.things = ['Angular', 'Rails 4.1', 'Working', 'Together!!', 'Sara'];
        console.log("test!");
        
        $http.get('/test.json').success(function(data){
        	$scope.test = data;
        	console.log("success!");
        	console.log(data);
        });
        $scope.viewMe = function(){
          $location.url('/tim')
        }
        $http.get('/todos.json').success(function(data){
        	$scope.post = data;
        	console.log("success!");
        	console.log(data);
        });


   // Trying to generate and save the thing
   

      $scope.addNew = function(){
      	console.log('add new todo');
      	var todo = {
      		text: $scope.todotxt,
      		done: false
      	};

      	// $scope.todos.push(todo);
      	$http.post('/todos.json',todo);
      	// console.log(todo.text)
        
$http.get('/todos.json').success(function(data){
          $scope.post = data;
          console.log("success!");
          console.log(data);
        });
      }

    });
