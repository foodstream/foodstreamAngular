foodStream.controller('loginController', ['$http', '$scope', '$location', function($http, $scope, $location){
  console.log('login whydonchya');

  $scope.submitLogin = function(){
    console.log('click');
    console.log($scope.username);
    console.log($scope.password);
    $http({
      method: 'POST',
      url: 'https://sheltered-wildwood-38449.herokuapp.com/sessions/login?email='+$scope.username+'&password='+$scope.password
    }).then(function successCallback(response){
      console.log('post?')
      console.log(response.data.token)

      localStorage.setItem('token',response.data.token);
      $location.path('/home');
    }, function errorCallback(response){
      console.log('not post?')
      alert('that is not a valid username/password')
    });
  }//end of submit login

  $scope.submitSignup = function(){
    console.log('click!!');
    $location.path('/signUp')
  }

}]);
