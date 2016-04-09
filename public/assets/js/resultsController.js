foodStream.controller('resultsController', ["$http", '$scope', '$location', function($http, $scope, $location){
  var token = localStorage.getItem('token');
  $scope.posts;

  $http.get('https://sheltered-wildwood-38449.herokuapp.com/posts/search.json?token='+token).then(function successCallback(response){
    // console.log(response.data);
    $scope.posts = response.data;
  }, function errorCallback(resonse){
    console.log(response);
  });

  $scope.getDetails = function(postId){
    console.log('clicked');
    console.log(postId);
    localStorage.setItem('resultsPostId', postId);
    $location.path('/details')
  }

  $scope.goHome = function() {
    $location.path('/home');
  }
}])
