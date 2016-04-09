foodStream.controller('homeController', ['$http', '$scope', '$location', 'getPostDetail', function($http, $scope, $location, getPostDetail){
  var token = localStorage.getItem('token')
  // console.log(token);
  $scope.search = function(){
    $location.path('/results');
  }



  $scope.posts;
  $http({
    method: 'GET',
    url:' https://sheltered-wildwood-38449.herokuapp.com/posts.json?token='+token
  }).then(function successCallback(response){
    console.log(response.data);
    $scope.posts = response.data;
  }, function errorCallback(response){
    console.log(response)
});

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
