foodStream.controller('createController', ['$http', '$scope', '$location', function($http, $scope, $location){
  console.log('你好！');

  //grab login token from localstorage
  var token = localStorage.getItem('token');

  //declare text field variables

  var title;
  var location;
  var startTime;
  var endTime;
  var description;
  var address;
  var lat;
  var lng;
  //point google places autocomplete to proper field
  var inputFrom = document.getElementById('create-post-location');

  //use google places autocomplete to input location addy & lat/long
  var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        var place = autocompleteFrom.getPlace();

        lat = place.geometry.location.lat();
        lng = place.geometry.location.lng();
        address = place.formatted_address;
          console.log(lat, lng, address)
    });

  //use pickadate to get standardized date-times
  // starting time
  $(".create-start-na").pickadate({
  format: 'yyyy/mm/dd'});
  $(".create-start-time-na").pickatime({
  format: 'h:iA'});

  //ending time
  $(".create-end-na").pickadate({
  format: 'yyyy/mm/dd'});
  $(".create-end-time-na").pickatime({
  format: 'h:iA'});

  //use jquery to grab text (ng-form didnt like it, sue me)
  $('.create-post').on('click', function(){
    title = $('.create-title').val();

    startDate = $('.create-start-na').val()
    startTime = $('.create-start-time-na').val();
    //create strating date for rails
    startString = startDate.concat(' ' + startTime);
    endDate = $('.create-end-na').val();
    endTime = $(".create-end-time-na").val();
    //create ending date for rails
    endString = endDate.concat(' ' + endTime);

    description = $('.create-description').val();

    console.log(title, startString, endString, description, lat, lng, address)
    //put values into json to send to rails
    var param = JSON.stringify({title:title, details:description, start_at:startString, end_at:endString,location_id:null, location:{address_string:address, lat:lat, lng:lng}, })
    console.log(param);

    //send post values to rails to create a post!
    $http.post('https://sheltered-wildwood-38449.herokuapp.com/posts?token='+token, param
    ).then(function successCallback(response){
      console.log('post?')
      console.log(response)
      $location.path('/home')
    }, function errorCallback(response){
      console.log('not post?')
    });
  });

}]);
