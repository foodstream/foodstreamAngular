foodStream.controller('homeController', ['$http', '$scope', '$location', function($http, $scope, $location){
  var token = localStorage.getItem('token')
  console.log(token);
}])
