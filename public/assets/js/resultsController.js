foodStream.controller('resultsController', ["$http", '$scope', '$location', 'geoLocationService', function($http, $scope, $location, geolocation){
  //get user token out of localstorage
  var token = localStorage.getItem('token');

  //define variables
  $scope.posts;
  $scope.position;
  $scope.message;

  //get the user's geolocation in lat/long
  geolocation().then(function (position) {
    $scope.position = position;
    // console.log($scope.position.coords.latitude)
    // console.log($scope.position.coords.longitude)
  }, function (reason) {
    $scope.message = "Could not be determined."
  });

  //get posts data
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/posts/search.json?token='+token).then(function successCallback(response){
    // console.log(response.data);
    $scope.posts = response.data;
  }, function errorCallback(resonse){
    console.log(response);
  });

  //get details of clicked post
  $scope.getDetails = function(postId){
    // console.log('clicked');
    // console.log(postId);
    localStorage.setItem('resultsPostId', postId);
    $location.path('/details')
  }

  //go home
  $scope.goHome = function() {
    $location.path('/home');
  }
}])
