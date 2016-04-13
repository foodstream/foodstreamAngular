foodStream.controller('editPostController', ['$http', '$scope', '$location', function($http, $scope, $location){
  console.log('你好！我叫edit post controller!');

  //get user token for API auth
  var token = localStorage.getItem('token');
  //get the id of the post to edit out of LS
  var postId = localStorage.getItem('createdPostId');

  $http.get('https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token='+token).then(function successCallback(response){
    console.log(response.data);
    $scope.title = response.data.title;
    $scope.location = response.data.address_string;
    console.log(response.data.start_at, response.data.end_at);
    var startArr = response.data.start_at.split(' ');
    console.log(startArr)
    $('.edit-post-start-na').val(startArr[0]) ;
    $('.edit-post-start-time-na').val(startArr[1]) ;
    var endArr = response.data.end_at.split(' ');
    console.log(endArr)
    $('.edit-post-end-na').val(endArr[0]);
    $('.edit-post-end-time-na').val(endArr[1]) ;
    $scope.description = response.data.details;
  }, function errorCallback(response){
    console.log('not get?', response);
  });



  //point google places autocomplete to correct field
  var inputFrom = document.getElementById('edit-post-location-ga');

  //use google places autocomplete to input location addy & lat/long
  var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();

        lat = place.geometry.location.lat();
        lng = place.geometry.location.lng();
        address = place.formatted_address;
          // console.log(lat, lng, address)
    });
  //declare variable for grabbing location value w/jquery
  var location;

  //date/time picker for start time
  $(".edit-post-start-na").pickadate({
  format: 'yyyy/mm/dd'});
  $(".edit-post-start-time-na").pickatime({
  format: 'h:iA'});
  var startDate;
  var startTime;

  //date/time picker for end time
  $(".edit-post-end-na").pickadate({
  format: 'yyyy/mm/dd'});
  $(".edit-post-end-time-na").pickatime({
  format: 'h:iA'});
  var endDate;
  var endTime;

  $scope.editPost = function(){
    location = $('#edit-post-location-ga').val();
    startDate = $('.edit-post-start-na').val();
    startTime = $('.edit-post-start-time-na').val();
    var startString = startDate.concat(' ' + startTime);
    endDate = $('.edit-post-end-na').val();
    endTime = $('.edit-post-end-time-na').val();
    var endString = endDate.concat(' ' + endTime);

    console.log($scope.title, location, startString, endString, $scope.description);
      $http.put('https://sheltered-wildwood-38449.herokuapp.com/posts/'+postId+'.json?token=' + token + "&post[title]=" + $scope.title + "&post[details]=" + $scope.description + "&post[start_at]=" + startString + "&post[end_at]=" + endString + "&post[address_string]=" + location + "&post[image_link]=" + $scope.nonce + $scope.fileFix
      ).then(function successCallback(response){
        console.log('post was edited');
        // console.log(response, response.data.id);
        localStorage.setItem('createdPostId', response.data.id)

        $location.path('/created')
      }, function errorCallback(response){
        console.log('post not created', response);
        console.log(startString, endString);
      });
  }
}])
