foodStream.controller('createdController', ['$http', '$scope','$location', function($http, $scope, $location){
  console.log('你好！');
  //get the id of the created post out of LS
  var postId = localStorage.getItem('createdPostId');
  //get token out of LS
  var token = localStorage.getItem('token');
  //remove created post id from LS...actually, if we have an edit we keep this..idk?
  // localStorage.removeItem('createdPostId');

  //get post information
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token).then(function successCallback(response){
    $scope.post = response.data;
  }, function errorCallback(response){
    console.log('not get?', response);
  });

  //go home
  $scope.goHome = function(){
    $location.path('/home');
  };

  //edit post (goes home currently, CHANGE THIS WHEN WE HAVE AN EDIT POST VIEW)
  $scope.goEdit = function(){
    $location.path('/home');
  };

  //delete post
  $scope.deletePost = function(){
    $http.delete('https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token).then(function successCallback(response){
      console.log('deleted', response);
      $location.path('/home');
    }, function errorCallback(response){
      console.log('not delete?', response);
      $location.path('/home');
    });
  };

}])
