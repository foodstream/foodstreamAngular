//grab signup info
//POST the new account info to our API

foodStream.controller('signUpController', ['$http', '$scope', '$location', function($http, $scope, $location) {
    // console.log("signup ctrllr up")

    $scope.submit = function() {
      console.log('clicked!')
    // $scope.newUser =
    $scope.email;
    $scope.password;
    $scope.organization;

    console.log($scope.email);
    console.log($scope.password);
    console.log($scope.organization);

    $http({
      method: 'POST',
      url: "https://sheltered-wildwood-38449.herokuapp.com/users/create?email=" + $scope.email + "&password=" + $scope.password + "&company=" + $scope.organization
    }).then(function successCallback(response) {
        console.log('post?')
        $location.path('/editProfile')
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        alert(response)
        console.log('no post?')
      });

    }

    $scope.backToLogin = function(){
      $location.path('/landing');
    }
}]);
