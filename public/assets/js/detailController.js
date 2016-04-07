foodStream.controller('detailController', ['$http', '$scope', 'getPostDetail', '$location', function($http, $scope, getPostDetail, $location) {
   console.log("detail ctrllr up");

  //get ID of post clicked in search results
  var postId = localStorage.getItem('resultsPostId');
  //get user token for API auth
  var token = localStorage.getItem('token');
  //get user ID to enable a claim
  var userId = localStorage.getItem('userId');

  //remove ID of clicked post b/c we dont need it no more
  localStorage.removeItem('resultsPostId');

  //call the API for post info
  $http({
    method: 'GET',
    url:' https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token
  }).then(function successCallback(response){
    console.log(response.data);
    $scope.post = response.data;
    console.log($scope.post.location);
  }, function errorCallback(response){console.log('hate')
  });

  //go back to the search results page
   $scope.goHome = function(){
     $location.path('/results');
   }

   //claim some food!
  $scope.claimPost = function(){
    //create the put json which tells the server that its ben claimed and who claimed it
    var param = JSON.stringify({claimed:'true', claimant_id: userId })
    //make the call!
    $http.put('https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token, param).then(function successCallback(response){
      console.log('CLAIMED');
      $location.path('/home')
    }, function errorCallback(response){
      console.log('that aint claimed')
    });
  }

}]);
