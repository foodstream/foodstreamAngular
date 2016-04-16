foodStream.controller('createController', ['$http', '$scope', '$location', 'Upload', function($http, $scope, $location, Upload){
  // console.log("create controller here!");

  //grab login token from localstorage
  var token = localStorage.getItem('token');
  var userId = localStorage.getItem('userId');

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
          // console.log(lat, lng, address)
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



  $scope.nonce = Math.floor(Math.random()*99999);


  $scope.submitNewPost = function(file){

    title = $('.create-title').val();

    startDate = $('.create-start-na').val()
    startTime = $('.create-start-time-na').val();
    //create starting date for rails
    startString = startDate.concat(' ' + startTime);
    endDate = $('.create-end-na').val();
    endTime = $(".create-end-time-na").val();
    //create ending date for rails
    endString = endDate.concat(' ' + endTime);

    description = $('.create-description').val();

    var formData = new FormData();
        formData.append('post[post_image]', file);
        formData.append('post[title]', title);
        formData.append('post[details]', description);
        formData.append('post[start_at]', startString);
        formData.append('post[end_at]', endString);
        formData.append('post[supplier_id]', userId);
        formData.append('post[address_string]', address);
        formData.append('post[latitude]', lat);
        formData.append('post[longitude]', lng);



    //send post values to rails to create a post!
    $http({
      method: 'POST',
      url:'https://sheltered-wildwood-38449.herokuapp.com/posts.json?token=' + token,
      data : formData,
      headers : {'Content-Type': undefined}
    }).then(function successCallback(response){
      console.log('new post was created');
      // console.log(response, response.data.id);
      localStorage.setItem('createdPostId', response.data.id)


      $location.path('/created')
    }, function errorCallback(response){
      console.log('post not created', response);
      // console.log(startString, endString);
    });

  };//end of submit new post



}]);
