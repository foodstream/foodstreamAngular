//this controller shows the details view off the search results page
foodStream.controller('detailController', ['$http', '$scope', '$location', function($http, $scope, $location) {
   console.log("detail ctrllr up");

  //get ID of post clicked in search results
  var postId = localStorage.getItem('resultsPostId');
  //get user token for API auth
  var token = localStorage.getItem('token');
  //get user ID to enable a claim
  var userId = localStorage.getItem('userId');

  //remove ID of clicked post b/c we dont need it no more..or not b/c directions
  // localStorage.removeItem('resultsPostId');

  //call the API for post info and set google map on callback response
  $http({
    method: 'GET',
    url:' http://localhost:3010/posts/'+postId+'.json?token='+token
  }).then(function successCallback(response){
    console.log(response.data);
    $scope.post = response.data;
    console.log($scope.post.location);
    //google map
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
    var map = new google.maps.Map(document.getElementById("post-detail-map"),
      mapOptions);
    //set marker
    var marker = new google.maps.Marker({
      position: myLatlng,
      title:"Food Is here"
    });
    //render marker
    marker.setMap(map);
    //set the directions link
    $scope.directionsLink = 'https://maps.google.com?saddr=Current+Location&daddr='+$scope.post.latitude+','+$scope.post.longitude;
    console.log($scope.directionsLink);

  }, function errorCallback(response){
    console.log('hate')
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
    $http.put('http://localhost:3010/posts/'+postId+'.json?token='+token, param).then(function successCallback(response){
      console.log('CLAIMED');
      $location.path('/home')
    }, function errorCallback(response){
      console.log('that aint claimed')
    });
  }

}]);
// http://localhost:3010
