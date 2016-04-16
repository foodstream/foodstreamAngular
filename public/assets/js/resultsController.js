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

  //get the user's geolocation in lat/long and use it to send intial search request
  geolocation().then(function (position) {
    $scope.position = position;

    //set variables to send to rails for search response
    userLat = $scope.position.coords.latitude
    userLng = $scope.position.coords.longitude
    // param = {latitude:userLat, longitude:userLng, radius:$scope.distanceInput}
    // console.log(param)
    //send variables to rails for search by location diameter response
    $http.get('https://sheltered-wildwood-38449.herokuapp.com/posts/search.json?token='+token+'&latitude='+userLat+'&longitude='+userLng+'&radius='+$scope.distanceInput).then(function successCallback(response){
      console.log(response.data);
      //set the data for showing the search results
      $scope.posts = response.data;
    }, function errorCallback(resonse){
      console.log(response);
    });
  });

  //subsequent search requests
  $scope.search = function(){
    $http.get('https://sheltered-wildwood-38449.herokuapp.com/posts/search.json?token='+token+'&latitude='+userLat+'&longitude='+userLng+'&radius='+$scope.distanceInput).then(function successCallback(response){
      console.log(response.data);
      $scope.posts = response.data;
    }, function errorCallback(resonse){
      console.log(response);
    });
  }


  //get details of clicked post
  $scope.getDetails = function(postId){
    // console.log('clicked');
    console.log(postId);
    localStorage.setItem('resultsPostId', postId);
    $location.path('/details')
  }

  //go home
  $scope.goHome = function() {
    $location.path('/home');
  }
}])
