foodStream.controller('editProfileController', ['$http', '$scope', function($http, $scope){
  console.log('edit ctrlr here');
  localStorage.getItem('token');

  $scope.submitEdit = function(){
    console.log("profile edit submitted");
  }

}]);
