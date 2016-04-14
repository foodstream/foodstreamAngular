foodStream.controller('chatController', ['$http', '$scope', '$location', function($http, $scope, $location){
  console.log('你好我叫谈论controller!')
  //grab login token and userId and postId from localstorage
  var token = localStorage.getItem('token');
  var userId = localStorage.getItem('userId');
  var postId = localStorage.getItem('chatId');
  //grab supplierId, claimantId, and post title from the 'gotochat' click
  var claimantId = localStorage.getItem('chatClaimantId');
  var supplierId = localStorage.getItem('chatSupplierId');
  var postTitle = localStorage.getItem('chatPostTitle');

  $scope.userId = userId;
  console.log($scope.userId);
  //push the scroll
  $(document).ready(function(){
  $('.chat-content-wrapper').animate({
  scrollTop: $('.chat-content-wrapper').get(0).scrollHeight}, 500);
  $scope.apply;
  });

  //get other user's email address
  //if the user is not the claimant, grab the claimants email to send the message
  if(claimantId === userId && claimantId != null){
    $http.get('https://sheltered-wildwood-38449.herokuapp.com/users/'+supplierId+'.json?token='+token).then( function successCallback(response){
      console.log('other user got', response.data);
      $scope.otherUserName = response.data.first_name+' '+response.data.last_name;
    }, function errorCallback(response){
      console.log('other user not got', response);
    });
  }
  //if the user is not the supplier, grab the suppliers email to send the message
  else if(supplierId === userId){
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



  //declare the variables for filling the subject line
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
    //create the json to send the message
    var param = {"post_id":postId,"body":$('.chat-input').val(),"subject":"Foodstream app message from "+$scope.userFirstName+" "+$scope.userLastName+" regarding "+postTitle,"recipient":"byronssupersweetdevacct@gmail.com"}
    console.log(param);
    //make the call
    $http.post('https://sheltered-wildwood-38449.herokuapp.com/messages/send_email?token='+token, param).then(function successCallback(response){
      console.log('message sent');
      $('.chat-input').val('');
      //once the message is sent, get the new list of messages to display
      $http.get('https://sheltered-wildwood-38449.herokuapp.com/messages?token='+token+'&post_id='+postId).then(function successCallback(response){
        console.log('get messages worked', response)
        $scope.messages = response.data;
      }, function errorCallback(response){
        console.log('didnt get messages');
      });
    }, function errorCallback(response){
      console.log('message not sent', response);
      $('.chat-input').val('');
      //once the message is sent, get the new list of messages to display (this is here b/c the server is issuing an error but still sending the message..change that once the issue is resolved)
      $http.get('https://sheltered-wildwood-38449.herokuapp.com/messages?token='+token+'&post_id='+postId).then(function successCallback(response){
        console.log('get messages worked', response)
        $scope.messages = response.data;
        $(document).ready(function(){
        $('.chat-content-wrapper').animate({
        scrollTop: $('.chat-content-wrapper').get(0).scrollHeight}, 300);
        $scope.apply;
        });
      }, function errorCallback(response){
        console.log('didnt get messages');
      });
    });
  };

  //go home on click of the home button
  $scope.goHome = function(){
    $location.path('/home');
  };

  //go to claimed on click of go to post (add logic to send user to created if supplier soon)
  $scope.backToPost = function(){
    console.log(supplierId, claimantId, userId);
    if(userId == supplierId){
      $location.path('/created');
    }else if(userId == claimantId)
    $location.path('/claimed')
  }


}]);
