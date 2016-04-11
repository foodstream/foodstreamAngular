foodStream.controller('resultsController', ["$http", '$scope', '$location', 'geoLocationService', function($http, $scope, $location, geolocation){
  //get user token out of localstorage
  var token = localStorage.getItem('token');

  //define variables
  $scope.posts;
  $scope.position;
  $scope.message;
  $scope.distanceInput = 20;
  var userLat;
  var userLng;
  var param;

  //get the user's geolocation in lat/long
  geolocation().then(function (position) {
    $scope.position = position;
    // console.log($scope.position.coords.latitude)
    // console.log($scope.position.coords.longitude)
    userLat = $scope.position.coords.latitude
    userLng = $scope.position.coords.longitude
    param = {latitude:userLat, longitude:userLng, radius:$scope.distanceInput}
    console.log(param)
    $http.get('https://sheltered-wildwood-38449.herokuapp.com/posts/search.json?token='+token+'&latitude='+userLat+'&longitude='+userLng+'&radius='+$scope.distanceInput).then(function successCallback(response){
      console.log(response.data);
      $scope.posts = response.data;
    }, function errorCallback(resonse){
      console.log(response);
    });
  }, function (reason) {
    $scope.message = "Could not be determined."
  });

  $scope.search = function(){
    $http.get('https://sheltered-wildwood-38449.herokuapp.com/posts/search.json?token='+token+'&latitude='+userLat+'&longitude='+userLng+'&radius='+$scope.distanceInput).then(function successCallback(response){
      console.log(response.data);
      $scope.posts = response.data;
    }, function errorCallback(resonse){
      console.log(response);
    });
  }





  //get posts data
  // $http.get('https://sheltered-wildwood-38449.herokuapp.com/posts/search.json?token='+token).then(function successCallback(response){
  //   // console.log(response.data);
  //   $scope.posts = response.data;
  // }, function errorCallback(resonse){
  //   console.log(response);
  // });

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
