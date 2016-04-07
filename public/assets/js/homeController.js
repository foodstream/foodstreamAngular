foodStream.controller('homeController', ['$http', '$scope', '$location', 'getPostDetail', function($http, $scope, $location, getPostDetail){
  var token = localStorage.getItem('token')
  // console.log(token);
  $scope.posts;
  $http({
    method: 'GET',
    url:' https://sheltered-wildwood-38449.herokuapp.com/posts.json?token='+token
  }).then(function successCallback(response){
    console.log(response.data);
    $scope.posts = response.data;
  }, function errorCallback(response){console.log('hate')
});

$scope.detailsId = function(postId){
  console.log('clicked');
  console.log(postId);
  localStorage.setItem('postId', postId)
  // getPostDetail.add(postId)
  $location.path('/details');
}

$scope.createPost = function(){
  $location.path('/create');
}

}])
