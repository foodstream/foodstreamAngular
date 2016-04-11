foodStream.controller('claimedController', ['$http', '$scope', 'getPostDetail', '$location', function($http, $scope, getPostDetail, $location) {
  //  console.log("claimed ctrllr up");
  //  console.log(getPostDetail.clickedPost);
  //get the ID of the post you just clicked
  var postId = localStorage.getItem('postId');
  //get the user token
  var token = localStorage.getItem('token');
  //get the user ID
  var userId  = localStorage.getItem('userId');
  // console.log(postId);

  //remove the post ID b/c it's a one-time need
  localStorage.removeItem('postId');

  //get the post info
  $http({
    method: 'GET',
    url:' https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token
  }).then(function successCallback(response){
    console.log(response.data);
    $scope.post = response.data;
  }, function errorCallback(response){console.log('hate')
  });


  //allow supplier to mark the post as completed
  $scope.markComplete = function(supplierId){
    if(supplierId == userId){
      $http.put(' https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token, {completed:true}).then(function successCallback(response){
        console.log('put successful', response);
      }, function errorCallback(response){console.log('put hate')
      });
    } else{
      alert('you must be the supplier of this food to mark the transaction complete')
    }
  }


  //go home
   $scope.goHome = function(){
     $location.path('/home');
   }

 $scope.removePost = function(claimantId, supplierId){
  //  console.log(claimantId, supplierId)
   //if the user is the supplier, delete the post
   if(supplierId  == userId){
     $http.delete('https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token).then(function successCallback(response){
      //  console.log('post deleted')
       $location.path('/home')
     }, function errorCallback(response){
       console.log('not deleted')
     })
   }
     //if the user is the claimant, remove their claim
    else if(claimantId == userId){
       var param = JSON.stringify({claimed:'false', claimant_id: 'null'})
       $http.put('https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token, param).then(function successCallback(response){
        //  console.log('UNCLAIMED');
         $location.path('/home')
       }, function errorCallback(response){
         console.log('not unclaimed');
       });
     }
  }

}]);
