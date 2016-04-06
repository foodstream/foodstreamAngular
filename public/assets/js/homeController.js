foodStream.controller('homeController', ['$http', '$scope', '$location', function($http, $scope, $location){
  var token = localStorage.getItem('token')
  console.log(token);
$scope.posts;
  $http({
    method: 'GET',
    url:' https://sheltered-wildwood-38449.herokuapp.com/posts?token='+token
  }).then(function successCallback(response){
    // console.log(response.data);
    $scope.posts = response.data;
  }, function errorCallback(response){console.log('hate')
});

}])
