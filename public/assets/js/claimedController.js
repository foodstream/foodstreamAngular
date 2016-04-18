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

  //remove the post ID b/c it's a one-time need..or not, because people will go back after getting directions
  // localhttps://sheltered-wildwood-38449.herokuapp.com

  $scope.goToChat = function(postId, supplierId, claimantId, title){
    localStorage.setItem('postId', postId);
    localStorage.setItem('chatSupplierId', supplierId);
    localStorage.setItem('chatClaimantId', claimantId);
    localStorage.setItem('chatPostTitle', title)
    $location.path('/chat');
  }

  $scope.directionsLink;
  //get the post info
  $http.get(
   'https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token).then(function successCallback(response){
    // console.log(response.data);
    //post info = callback response
    $scope.post = response.data;
    // console.log($scope.post.latitude, $scope.post.longitude)
    //use callback lat/long to display google map of post location
    var marker;
    var myLatLng;
    //set map latLng w/callback info
    myLatlng = new google.maps.LatLng($scope.post.latitude, $scope.post.longitude);
    var mapOptions = {
      zoom: 16,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //render map
    var map = new google.maps.Map(document.getElementById("claimed-map"),
      mapOptions);
    //set marker
    var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Food Is here"
    });
    //render marker
    marker.setMap(map);

    //set directions link
    $scope.directionsLink = 'https://maps.google.com?saddr=Current+Location&daddr='+$scope.post.latitude+','+$scope.post.longitude;
    console.log($scope.directionsLink);

  }, function errorCallback(response){
    console.log('hate');
  });

  //add event to calendar
  $scope.addToCalendar = function(){
    $http.post('https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'/send_ical?token='+token).then(function successCallback(response){
      alert('event sent to email');
    }, function errorCallback(response){
      console.log('event not sent', response);
      alert('event sent to email');
    });
  };

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
