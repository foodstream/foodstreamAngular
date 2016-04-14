foodStream.controller('editProfileController', ['$http', '$scope', '$location', 'logged', 'Upload', function($http, $scope, $location, logged, Upload){
  console.log('edit ctrlr here');

  //get login token out of localstorage
  $scope.userToken = localStorage.getItem('token');
  //get userId out of localstorage
  userId = localStorage.getItem('userId');
  // console.log($scope.userToken)

  //declare input value variables
  $scope.first;
  $scope.last;
  $scope.email;
  $scope.org;
  $scope.userLocation;
  $scope.userDescription;
  var lat;
  var lng;

  $scope.logout = function(){

    $http.get('https://sheltered-wildwood-38449.herokuapp.com/sessions/logout?token='+$scope.userToken).then(function successCallback(){
      console.log('logged out');
      localStorage.removeItem('token');
      logged.token = undefined;
      $location.path('/landing');
    }, function errorCallback(){
      console.log('not logged out');
      localStorage.removeItem('token');
      logged.token = undefined;
      $location.path('/landing');
    })

  }//close logout function

  //get user info to migrate onto page
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'.json?token='+$scope.userToken).then(function success(response){
    console.log(response);
    $scope.first = response.data.first_name;
    $scope.last = response.data.last_name;
    $scope.email = response.data.email;
    $scope.org = response.data.organization;
    $scope.userLocation = response.data.address_string;
    $scope.userDescription = response.data.description;
    $scope.profilePic = response.data.image_link;
    // console.log($scope.profilePic);
  }, function error(response){
    console.log('GET failed', response);
  });

  //point google places autocomplete to the proper field
  var inputFrom = document.getElementById('edit-profile-location-input');

  //use google places autocomplete to input location addy & lat/long
  var autocompleteFrom = new google.maps.places.Autocomplete(inputFrom);
      google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
          var place = autocompleteFrom.getPlace();

          lat = place.geometry.location.lat();
          lng = place.geometry.location.lng();
          $scope.userLocation = place.formatted_address;
            console.log(lat, lng, $scope.userLocation)
      });


  //grab the profile info field info and send it
  $scope.submitEdit = function(){
    console.log("submit edit button clicked");

    $scope.first;
    $scope.last;
    $scope.email;
    $scope.org;
    $scope.userLocation;
    $scope.userDescription;

    $scope.nonce = Math.floor(Math.random()*99999);

    console.log($("#randomFile").val());
    console.log($("#fileName").val());
    console.log($scope.nonce);

    $scope.fileFix = ($("#fileName").val()).slice(12);

    $scope.imgPre = "IMG";

    // console.log($scope.first, $scope.last);
    var param = JSON.stringify({first_name:$scope.first, last_name:$scope.last, description:$scope.userDescription, email:$scope.email, orgainization:$scope.org, address_string:$scope.userLocation, latitude:lat, longitude:lng, location_id:null, image_link:+$scope.imgPre+$scope.nonce+$scope.fileFix});

    console.log(param)


    $http.put('https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'?token='+  $scope.userToken, param)
      .then(function success(response){
          console.log("edited successfully", response);
          localStorage.setItem('email', response.data.email);
          $location.path('/home');
        }, function error(response){
          console.log("edit profile failed");
          console.log(response);
          alert('edit failed');
          $location.path('/home');
      });

  };//close submitEdit function

  // $scope.nonce = Math.floor(Math.random()*99999);
  //
  // $scope.logFile = function(){
  //   console.log($("#randomFile").val());
  //   console.log($("#fileName").val());
  //   console.log($scope.nonce);
  //
  //   $scope.fileFix = ($("#fileName").val()).slice(12);

    // $http.put('https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'?token='+  $scope.userToken + '&user[image_link]='+ $scope.nonce + $scope.fileFix)
    //   .then(function success(){
    //     console.log("sent file name to database");
    //   });


}]);
