foodStream.controller('loginController', ['$http', '$scope', function($http, $scope){
  console.log('login whydonchya');

  $scope.submit = function(){
    console.log('click');
    console.log($scope.username);
    console.log($scope.password);
    $http({
      method: 'POST',
      url: 'https://sheltered-wildwood-38449.herokuapp.com/sessions/login?email='+$scope.username+'&password='+$scope.password
    }).then(function successCallback(response){
      console.log('post?')
      console.log(response.data.token)
      

    }, function errorCallback(response){
      console.log('not post?')
    });

  }

}]);
