foodStream.controller('chatController', ['$http', '$scope', '$location', function($http, $scope, $location){
  console.log('你好我叫谈论controller!')
  //grab login token and userId and postId from localstorage
  var token = localStorage.getItem('token');
  var userId = localStorage.getItem('userId');
  var postId = localStorage.getItem('chatId');
  var claimantId = localStorage.getItem('chatClaimantId');
  var supplierId = localStorage.getItem('chatSupplierId');
  var postTitle = localStorage.getItem('chatPostTitle');

  //push the scroll
  $(document).ready(function(){
  $('.chat-content-wrapper').animate({
  scrollTop: $('.chat-content-wrapper').get(0).scrollHeight}, 2000);
});

  //get other user's email address
  if(claimantId === userId && claimantId != null){
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/users/'+supplierId+'.json?token='+token).then( function successCallback(response){
    console.log('other user got', response.data);
    $scope.otherUserName = response.data.first_name+' '+response.data.last_name;
  }, function errorCallback(response){
    console.log('other user not got', response);
  });
} else if(supplierId === userId){
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/users/'+claimantId+'.json?token='+token).then( function successCallback(response){
    console.log('other user got', response.data);
      $scope.otherUserName = response.data.first_name+' '+response.data.last_name;
  }, function errorCallback(response){
    console.log('other user not got', response);
  });
}
  //get messages
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/messages?token='+token+'&post_id='+postId).then(function successCallback(response){
    console.log('get messages worked', response)
    $scope.messages = response.data;
  }, function errorCallback(response){
    console.log('didnt get messages');
  });

  $scope.userFirstName;
  $scope.userLastName;
  //get user information for to fill message email subject line
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'.json?token='+token).then( function successCallback(response){
    console.log('user info got', response.data);
    $scope.userFirstName = response.data.first_name;
    $scope.userLastName =  response.data.last_name;
  }, function errorCallback(response){
    console.log('user not got', response);
  });

  //send a message
  $scope.sendMessage = function(){
    var param = {"post_id":postId,"body":$('.chat-input').val(),"subject":"Foodstream app message from "+$scope.userFirstName+" "+$scope.userLastName+" regarding "+postTitle,"recipient":"nicoleacadavillo@gmail.com"}
    console.log(param);
    $http.post('https://sheltered-wildwood-38449.herokuapp.com/messages/send_email?token='+token, param).then(function successCallback(response){
      console.log('message sent');
      $('.chat-input').val('');
      $http.get('https://sheltered-wildwood-38449.herokuapp.com/messages?token='+token+'&post_id='+postId).then(function successCallback(response){
        console.log('get messages worked', response)
        $scope.messages = response.data;
      }, function errorCallback(response){
        console.log('didnt get messages');
      });
    }, function errorCallback(response){
      console.log('message not sent', response);
      $('.chat-input').val('');
      $http.get('https://sheltered-wildwood-38449.herokuapp.com/messages?token='+token+'&post_id='+postId).then(function successCallback(response){
        console.log('get messages worked', response)
        $scope.messages = response.data;
      }, function errorCallback(response){
        console.log('didnt get messages');
      });
    });
  };

  $scope.goHome = function(){
    $location.path('/home');
  };

  $scope.backToPost = function(){
    $location.path('/claimed')
  }


}]);
