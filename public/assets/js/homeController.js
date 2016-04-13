foodStream.controller('homeController', ['$http', '$scope', '$location', 'geoLocationService', function($http, $scope, $location, geolocation){

  //get user token out of ls
  var token = localStorage.getItem('token');
  //get userID out of ls
  var userId = localStorage.getItem('userId');
  // console.log(userId)
  // console.log(token);


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

  $scope.goToChat = function(chatId){
    localStorage.setItem('chatId', chatId);
    $location.path('/chat');
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
