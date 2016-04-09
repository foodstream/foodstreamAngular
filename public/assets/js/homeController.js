<<<<<<< HEAD
foodStream.controller('homeController', ['$http', '$scope', '$location', 'geoLocationService', function($http, $scope, $location, geolocation){
  var token = localStorage.getItem('token')
  // console.log(token);

  $scope.position = null;
  $scope.message = "Determining gelocation...";

  geolocation().then(function (position) {
    $scope.position = position;
    console.log($scope.position.coords.latitude)
    console.log($scope.position.coords.longitude)
  }, function (reason) {
    $scope.message = "Could not be determined."
  });


  $scope.search = function(){

=======
foodStream.controller('homeController', ['$http', '$scope', '$location', 'getPostDetail', function($http, $scope, $location, getPostDetail){
  var token = localStorage.getItem('token')
  // console.log(token);
  $scope.search = function(){
>>>>>>> 0b8006e1ee36f322b4439023ef202716f5ea39e0
    $location.path('/results');
  }



<<<<<<< HEAD


  $scope.posts;

=======
  $scope.posts;
>>>>>>> 0b8006e1ee36f322b4439023ef202716f5ea39e0
  $http({
    method: 'GET',
    url:' https://sheltered-wildwood-38449.herokuapp.com/posts.json?token='+token
  }).then(function successCallback(response){
    console.log(response.data);
    $scope.posts = response.data;
  }, function errorCallback(response){
    console.log(response)
<<<<<<< HEAD
  });
=======
});
>>>>>>> 0b8006e1ee36f322b4439023ef202716f5ea39e0

$scope.detailsId = function(postId){
  console.log('clicked');
  console.log(postId);
  localStorage.setItem('postId', postId);
  // getPostDetail.add(postId)
  $location.path('/claimed');
}

$scope.createPost = function(){
  $location.path('/create');
}

}])
