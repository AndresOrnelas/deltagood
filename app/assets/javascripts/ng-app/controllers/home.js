myApp.config([
  "$httpProvider", function(provider) {
    return provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

myApp.controller('HomeCtrl', function ($scope, $location, $http, sharedProperties) {
        $scope.slide = 'slide-left'
        $scope.things = ['Angular', 'Rails 4.1', 'Working', 'Together!!', 'Sara'];
        $scope.go = function(path){
          $scope.slide = 'slide-left';
          $location.url(data)    
          }
        $http.get('/protocol.json').success(function(data){
        	$scope.protocols = data;

        });

        //Activated when we want to see Run History
        $scope.visit = function(data, name){
          $scope.slide = 'slide-left';
          sharedProperties.setProtocol(name)
          $location.url(data)
        }

        //Activated when we start a Run
        $scope.start = function(data, name){
          $scope.slide = 'slide-right';
          sharedProperties.setProtocol(name)
          $location.url(data)
        }

   // Trying to generate and save the thing
      $scope.addNew = function(){
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
