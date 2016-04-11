foodStream.controller('editProfileController', ['$http', '$scope', '$location', function($http, $scope, $location){
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

  //get user info to migrate onto page
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'.json?token='+$scope.userToken).then(function success(response){
    console.log(response);
    $scope.first = response.data.first_name;
    $scope.last = response.data.last_name;
    $scope.email = response.data.email;
    $scope.org = response.data.organization;
    $scope.userLocation = response.data.address_string;
    $scope.userDescription = response.data.description;
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

  //enable upload to amazon s3 temp bucket
  $scope.creds = {
  bucket: 'elasticbeanstalk-us-west-2-052502637371',
  access_key: 'AKIAJFAX6BLGJFLZIZAA',
  secret_key: '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'
}

$scope.upload = function() {
  // Configure The S3 Object
  AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
  AWS.config.region = 'us-east-1';
  var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

  if($scope.file) {
    var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

    bucket.putObject(params, function(err, data) {
      if(err) {
        // There Was An Error With Your S3 Config
        alert(err.message);
        return false;
      }
      else {
        // Success!
        alert('Upload Done');
      }
    })
    .on('httpUploadProgress',function(progress) {
          // Log Progress Information
          console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
        });
  }
  else {
    // No File Selected
    alert('No File Selected');
  }
}


  //grab the profile info field info and send it
  $scope.submitEdit = function(){
    console.log("submit edit button clicked");


    $scope.first;
    $scope.last;
    $scope.email;
    $scope.org;
    $scope.userLocation;
    $scope.userDescription;


    // console.log($scope.first, $scope.last);
    var param = JSON.stringify({first_name:$scope.first, last_name:$scope.last, description:$scope.userDescription, email:$scope.email, orgainization:$scope.org, address_string:$scope.userLocation, latitude:lat, longitude:lng, location_id:null});
    console.log(param)


    $http.put('https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'?token='+  $scope.userToken, param)
      .then(function success(response){
          console.log("edited successfully", response);
          $location.path('/home');
        }, function error(response){
          console.log("edit profile failed");
          console.log(response);
          alert('edit failed');
          $location.path('/home');
      });

  }



}]);
