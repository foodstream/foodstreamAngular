foodStream.controller('createdController', ['$http', '$scope','$location', function($http, $scope, $location){
  console.log('你好！');
  //get the id of the created post out of LS
  var postId = localStorage.getItem('createdPostId');
  //get token out of LS
  var token = localStorage.getItem('token');
  //remove created post id from LS...actually, if we have an edit we keep this..idk?
  // localStorage.removeItem('createdPostId');

  $scope.goToChat = function(postId, supplierId, claimantId){
    console.log(postId, supplierId, claimantId, $scope.post.title)
    localStorage.setItem('chatId', postId);
    localStorage.setItem('chatSupplierId', supplierId);
    localStorage.setItem('chatClaimantId', claimantId);
    localStorage.setItem('chatPostTitle', $scope.post.title);
    $location.path('/chat');
  }

  //get post information
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token).then(function successCallback(response){
    $scope.post = response.data;
    console.log($scope.post);

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
    var map = new google.maps.Map(document.getElementById("created-post-gmap"),
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
    console.log('not get?', response);
  });
  //send ical to user
  $scope.addToCalendar = function(){
    $http.post('https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'/send_ical?token='+token).then(function successCallback(response){
      alert('event sent to email');
    }, function errorCallback(response){
      console.log('event not sent', response);
    })
  }

  //go home
  $scope.goHome = function(){
    $location.path('/home');
  };

  //edit post (goes home currently, CHANGE THIS WHEN WE HAVE AN EDIT POST VIEW)
  $scope.goEdit = function(){
    $location.path('/editPost');
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
