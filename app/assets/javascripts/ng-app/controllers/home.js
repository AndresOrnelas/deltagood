myApp.controller('HomeCtrl', function ($scope, $http, $location) {
        $scope.things = ['Angular', 'Rails 4.1', 'Working', 'Together!!', 'Sara'];
        console.log("test!");
        
        $scope.showFlag = false;

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
<<<<<<< HEAD

      };
=======
        
$http.get('/todos.json').success(function(data){
          $scope.post = data;
          console.log("success!");
          console.log(data);
        });
      }
>>>>>>> 48b20eac15591a8233e9a249c3ceaf2bd6d524d4

    });
