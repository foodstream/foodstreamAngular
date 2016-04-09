foodStream.controller('createController', ['$http', '$scope', '$location', function($http, $scope, $location){
  console.log('你好！');
<<<<<<< HEAD
  //grab login token from localstorage
  var token = localStorage.getItem('token');

  //declare text field variables
=======
  var token = localStorage.getItem('token');
>>>>>>> 0b8006e1ee36f322b4439023ef202716f5ea39e0
  var title;
  var location;
  var startTime;
  var endTime;
  var description;
<<<<<<< HEAD
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



//use jquery to grab text (ng-form didnt like it, sue me)
$('.create-post').on('click', function(){
  title = $('.create-title').val();
  // location = $('.create-location').val();
  startTime = $('.create-start').val();
  endTime = $('.create-end').val();
  description = $('.create-description').val();
  console.log(title, startTime, endTime, description, lat, lng, address)
  //put values into json to send to rails
  var param = JSON.stringify({title:title, details:description, start_at:startTime, end_at:endTime,location_id:5, location:{address_string:address, latitude:lat, longitude:lng}, })
  console.log(param);

  //send post values to rails to create a post!
  // $http.post('https://sheltered-wildwood-38449.herokuapp.com/posts.json?token='+token, param
  // ).then(function successCallback(response){
  //   console.log('post?')
  //   console.log(response)
  //   $location.path('/home')
  // }, function errorCallback(response){
  //   console.log('not post?')
  // });
});

=======
$('.create-post').on('click', function(){
  title = $('.create-title').val();
  location = $('.create-location').val();
  startTime = $('.create-start').val();
  endTime = $('.create-end').val();
  description = $('.create-description').val();
  console.log(title, location, startTime, endTime, description)
  var param = JSON.stringify({title:title, details:description, start_at:startTime, end_at:endTime,location_id:5, location:{address_1:location},  })
  console.log(param);
  $http.post('https://sheltered-wildwood-38449.herokuapp.com/posts.json?token='+token, param
  ).then(function successCallback(response){
    console.log('post?')
    console.log(response)
    $location.path('/home')
  }, function errorCallback(response){
    console.log('not post?')
  });
});
//
  $scope.submit = function(){
    console.log($scope.title);
    console.log('clicked!')
  };

// PICKADATE

$(".create-start-na").pickadate({
format: 'mm/dd/yyyy'});
$(".create-start-time-na").pickatime({
format: 'HH:i'});


$(".create-end-na").pickadate({
format: 'mm/dd/yyyy'});
$(".create-end-time-na").pickatime({
format: 'HH:i'});
>>>>>>> 0b8006e1ee36f322b4439023ef202716f5ea39e0

}]);
