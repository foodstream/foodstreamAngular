foodStream.controller('createController', ['$http', '$scope', '$location', function($http, $scope, $location){
  console.log('你好！');

  //grab login token from localstorage
  var token = localStorage.getItem('token');
  var userId = localStorage.getItem('userId');
  // console.log(userId);

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
  format: 'mm/dd/yyyy'});
  $(".create-start-time-na").pickatime({
  format: 'h:iA'});

  //ending time
  $(".create-end-na").pickadate({
  format: 'mm/dd/yyyy'});
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

    // console.log(title, startString, endString, description, lat, lng, address)
    //put values into json to send to rails
    var param = JSON.stringify({title:title, details:description, start_at:startString, end_at:endString, supplier:{id:userId}, address_string:address, latitude:lat, longitude:lng })
    console.log(param);

    //send post values to rails to create a post!
    $http.post('https://sheltered-wildwood-38449.herokuapp.com/posts.json?token=' + token, param
    ).then(function successCallback(response){
      console.log('new post was created');
      // console.log(response, response.data.id);
      localStorage.setItem('createdPostId', response.data.id)

      $location.path('/created')
    }, function errorCallback(response){
      console.log('post not created', response)
    });
  });

  $scope.nonce = Math.floor(Math.random()*99999);

  $scope.submitNewPost = function(){
    console.log($("#randomFile").val());
    console.log($("#fileName").val());
    console.log($scope.nonce);

    $scope.fileFix = ($("#fileName").val()).slice(12);

    $http.post('https://sheltered-wildwood-38449.herokuapp.com/posts?token=' + token + '&post[image_link]='+ $scope.nonce + $scope.fileFix)
      .then(function success(){
        console.log("sent file name to database");
      });
  }

}]);
