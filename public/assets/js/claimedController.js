foodStream.controller('claimedController', ['$http', '$scope', 'getPostDetail', '$location', function($http, $scope, getPostDetail, $location) {
   console.log("claimed ctrllr up");
  //  console.log(getPostDetail.clickedPost);
  var postId = localStorage.getItem('postId');
  var token = localStorage.getItem('token');
  console.log(postId);
  localStorage.removeItem('postId');

  $http({
    method: 'GET',
    url:' https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token
  }).then(function successCallback(response){
    console.log(response.data);
    $scope.post = response.data;
    console.log($scope.post.location);
  }, function errorCallback(response){console.log('hate')
});

   $scope.goHome = function(){
     $location.path('/home');
   }
}]);
