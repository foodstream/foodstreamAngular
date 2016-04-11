

foodStream.controller('signUpController', ['$http', '$scope', '$location', function($http, $scope, $location) {
    // console.log("signup ctrllr up")

    //grab user information for signup, put relevant data into localstorage
    $scope.submit = function() {
      // console.log('submit clicked!')
    //declare varibles
    $scope.email;
    $scope.password;
    $scope.organization;

    // console.log($scope.email);
    // console.log($scope.password);
    // console.log($scope.organization);

    $http({
      method: 'POST',
      url: "https://sheltered-wildwood-38449.herokuapp.com/users?user[email]=" + $scope.email + "&user[password]=" + $scope.password + "&user[organization]=" + $scope.organization
    }).then(function successCallback(response) {
          // console.log(response.data.token)
          // console.log(response.data.id)
          //put token and userid into LS on POST success
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userId', response.data.id);
          // console.log('new user posted');

          $location.path('/editProfile');
      }, function errorCallback(response) {
          console.log(response);
          console.log('user not posted');
      });

    }//close submit function

    
//already have an account? click here so you aren't trapped in signup if you are an existing user
    $scope.backToLogin = function(){
      $location.path('/landing');
    }
}]);
