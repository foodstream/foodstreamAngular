foodStream.controller('homeController', ['$http', '$scope', '$location', 'geoLocationService', function($http, $scope, $location, geolocation){

  //get user token out of ls
  var token = localStorage.getItem('token');
  //get userID out of ls
  var userId = localStorage.getItem('userId');
  // console.log(userId)
  // console.log(token);
  $scope.search = function(){
    $location.path('/results');
  }


  //define post variables
  $scope.posts;

  //get user's posts.
  $http({
    method: 'GET',
    url:' https://sheltered-wildwood-38449.herokuapp.com/posts.json?token='+token
  }).then(function successCallback(response){
    // console.log(response.data);
    $scope.posts = response.data;
  }, function errorCallback(response){
    // console.log(response)
  });

  //declare filter variable for post filters
  $scope.filters = {};

  //see all posts where user is claimant
  $scope.seeClaimed = function(){
    $scope.filters = {};
    $scope.filters.claimant_id = userId;

  };

  //see all posts where user is supplier
  $scope.seeProvided = function(){
    $scope.filters = {};
    $scope.filters.supplier_id = userId;
  }


  //get the ID of the post a user wants more details on, and take them to that page
  $scope.detailsId = function(postId){
    // console.log('clicked');
    // console.log(postId);
    localStorage.setItem('postId', postId);
    $location.path('/claimed');
  };

  //migrate user to search page
  $scope.search = function(){
    $location.path('/results');
  }

  //migrate user to create post page
  $scope.createPost = function(){
    $location.path('/create');
  };

}]);

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

// //define geolocation variables
// $scope.position = null;
// $scope.message = "Determining gelocation...";
//
// //get user geolocation
// geolocation().then(function (position) {
//   $scope.position = position;
//   // console.log($scope.position.coords.latitude)
//   // console.log($scope.position.coords.longitude)
// }, function (reason) {
//   $scope.message = "Could not be determined."
// });
