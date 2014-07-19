myApp.config([
  "$httpProvider", function(provider) {
    return provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

myApp.controller('HomeCtrl', function ($scope, $location, $http) {
        $scope.things = ['Angular', 'Rails 4.1', 'Working', 'Together!!', 'Sara'];
        $scope.go = function(path){
          $scope.slide = 'slide-left';
          $location.url(data)    
          }
        $http.get('/protocol.json').success(function(data){
        	$scope.test = data;

        });
        $scope.visit = function(data){
          $scope.slide = 'slide-right';
          $location.url(data)
        }
        $http.get('/posts.json').success(function(data){
        	$scope.post = data;
        });
   // Trying to generate and save the thing
      $scope.addNew = function(){
      	console.log('add new todo');
      	var todo = {
      		text: $scope.todotxt,
      		done: false
      	};
      	$http.post('/posts.json',todo);        
        $http.get('/posts.json').success(function(data){
          $scope.post = data;
        });
      }

    });
