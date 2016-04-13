foodStream.controller('editPostController', ['$http', '$scope', '$location', function($http, $scope, $location){
  console.log('你好！我叫edit post controller!');

  //get user token for API auth
  var token = localStorage.getItem('token');


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

    $(".edit-post-start-na").pickadate({
    format: 'yyyy/mm/dd'});
    $(".edit-post-start-time-na").pickatime({
    format: 'h:iA'});

    //ending time
    $(".edit-post-end-na").pickadate({
    format: 'yyyy/mm/dd'});
    $(".edit-post-end-time-na").pickatime({
    format: 'h:iA'});

    $scope.editPost = function(){
      console.log($scope.title, $scope.location)
    }
}])
