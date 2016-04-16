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
      localStorage.clear();
      logged.token = undefined;
      $location.path('/landing');
    }, function errorCallback(){
      console.log('not logged out');
      localStorage.clear();
      logged.token = undefined;
      $location.path('/landing');
    });

  };//close logout function


  //get user info to migrate onto page
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'.json?token='+$scope.userToken).then(function success(response){
    console.log(response);
    $scope.first = response.data.first_name;
    $scope.last = response.data.last_name;
    $scope.email = response.data.email;
    $scope.org = response.data.organization;
    $scope.userLocation = response.data.address_string;
    $scope.userDescription = response.data.description;
    $scope.profilePic = response.data.profile_image;
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
  $scope.submitEdit = function(file){

    console.log("submit edit button clicked");
    console.log(file)

    // var param = {first_name:$scope.first, last_name:$scope.last, description:$scope.userDescription, email:$scope.email, orgainization:$scope.org, address_string:$scope.userLocation, latitude:lat, longitude:lng, location_id:null, profile_image: file};


    // console.log(param)
    // $scope.base64file
    console.log($scope.org);
    var formData = new FormData();
    if( file != undefined){
      formData.append('user[profile_image]', file);
    };
    formData.append('user[first_name]', $scope.first);
    formData.append('user[last_name]', $scope.last);
    formData.append('user[description]', $scope.userDescription);
    formData.append('user[email]', $scope.email);
    formData.append('user[organization]', $scope.org);
    formData.append('user[address_string]', $scope.userLocation);
    if(lat != undefined){
      formData.append('user[latitude]', lat);
    };
    if(lng != undefined){
      formData.append('user[longitude]', lng);
    }
    console.log(formData);

      $http({
        method: 'PUT',
        url:'https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'?token='+$scope.userToken,
        data: formData,
        headers : {'Content-Type': undefined}
      }).then(function success(response){
          console.log("edited successfully", response);
          localStorage.setItem('email', response.data.email);
          $location.path('/home');
        }, function error(response){
          console.log("edit profile failed");
          console.log(response);
          // alert('edit failed');
          $location.path('/home');
        });

  };//close submitEdit function

}]);
