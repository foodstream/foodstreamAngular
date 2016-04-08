foodStream.controller('createController', ['$http', '$scope', '$location', function($http, $scope, $location){
  console.log('你好！');
  var token = localStorage.getItem('token');
  var title;
  var location;
  var startTime;
  var endTime;
  var description;
$('.create-post').on('click', function(){
  title = $('.create-title').val();
  location = $('.create-location').val();
  startTime = $('.create-start').val();
  endTime = $('.create-end').val();
  description = $('.create-description').val();
  console.log(title, location, startTime, endTime, description)
  var param = JSON.stringify({title:title, details:description, start_at:startTime, end_at:endTime,location_id:5, location:{address_1:location},  })
  console.log(param);
  $http.post('https://sheltered-wildwood-38449.herokuapp.com/posts.json?token='+token, param
  ).then(function successCallback(response){
    console.log('post?')
    console.log(response)
    $location.path('/home')
  }, function errorCallback(response){
    console.log('not post?')
  });
});
//
  $scope.submit = function(){
    console.log($scope.title);
    console.log('clicked!')
  };

// PICKADATE

$(".create-start-na").pickadate({
format: 'mm/dd/yyyy'});
$(".create-start-time-na").pickatime({
format: 'HH:i'});


$(".create-end-na").pickadate({
format: 'mm/dd/yyyy'});
$(".create-end-time-na").pickatime({
format: 'HH:i'});

}]);
