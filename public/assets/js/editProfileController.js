foodStream.controller('editProfileController', ['$http', '$scope', function($http, $scope){
  console.log('edit ctrlr here');
  $scope.userToken = localStorage.getItem('token');
  userId = localStorage.getItem('userId');
  console.log($scope.userToken)

  $scope.submitEdit = function(){
    console.log("submit edit button clicked");

    $scope.first;
    $scope.last;
    $scope.email;
    $scope.org;
    $scope.userLocation;
    $scope.userDescription;

    console.log($scope.first, $scope.last);
    var param = {first_name:$scope.first, last_name:$scope.last, description:$scope.userDescription, location_id:1};

    $http.put('https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'?token='+  $scope.userToken, param)
      .then(function success(response){
          console.log("edited successfully");
          $location.path('/home');
        }, function error(response){
          console.log("edit profile failed");
          console.log(response);
      });

  }

}]);
