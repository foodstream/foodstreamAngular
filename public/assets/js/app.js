var foodStream = angular.module("foodStream", ['ngRoute']);

foodStream.controller('appController', ['$http', '$scope', '$location', function($http, $scope, $location){

  //create a variable that changes when user is logged in for ng-show
  $scope.logged=false;
  //get login token out of localstorage
  $scope.userToken = localStorage.getItem('token');
  //get userId out of localstorage
  userId = localStorage.getItem('userId');
  $scope.first;
  //check and see if user is logged in...if they are, show a user icon in the header that is a link to the edit-profile page
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'.json?token='+$scope.userToken).then(function success(response){
        console.log(response);
        $scope.first = response.data.first_name;
        $scope.last = response.data.last_name;
        $scope.email = response.data.email;
        $scope.org = response.data.organization;
    }, function error(response){
      console.log('GET failed');
  });

  //if a token exists, log the user in
  if($scope.userToken != null){
    $scope.logged = true;
    console.log('logged', $scope.logged)
    $scope.apply;
  }; 

  //when you click on the user icon, you go to the edit profile page...
  $scope.goToProfile = function(){
    $location.path('/editProfile');
  };

  $scope.goHome = function(){
    $location.path('/home');
  };

}]);



foodStream.factory('getPostDetail', function() {
var clickedPost = {};
// // var theId;
// clickedPost.number = []
//
// clickedPost.add = function(postId){
//   clickedPost.number.push({id: postId});
//     console.log(clickedPost.number);
// };
//
// // function(postId){
// //     console.log(postId);
// //     // console.log(details);
// //     theId = postId;
// //     // var clickedPost =  postId;
// //
// //   }
//   console.log(clickedPost);
  return clickedPost;


 });

//from http://www.proccli.com/2013/10/angularjs-geolocation-service/
foodStream.factory("geoLocationService", ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
    return function () {
        var deferred = $q.defer();

        if (!$window.navigator) {
            $rootScope.$apply(function() {
                deferred.reject(new Error("Geolocation is not supported"));
            });
        } else {
            $window.navigator.geolocation.getCurrentPosition(function (position) {
                $rootScope.$apply(function() {
                    deferred.resolve(position);
                });
            }, function (error) {
                $rootScope.$apply(function() {
                    deferred.reject(error);
                });
            });
        }

        return deferred.promise;
    }
}]);



foodStream.config(function($routeProvider){
  $routeProvider
    .when('/landing', {
      templateUrl : '/views/login.html',
      controller : 'loginController'
    })

    .when('/signUp', {
      templateUrl : '/views/signup.html',
      controller : 'signUpController'
    })

    .when('/editProfile', {
      templateUrl : '/views/editprofile.html',
      controller : 'editProfileController'
    })

    .when('/create', {
      templateUrl : '/views/create.html',
      controller : 'createController'
    })

    .when('/created', {
      templateUrl : '/views/created.html',
      controller : 'createdController'
    })

    .when('/home', {
      templateUrl : '/views/home.html',
      controller : 'homeController'
    })

    .when('/details', {
      templateUrl : '/views/postdetail.html',
      controller : 'detailController'
    })

    .when('/results', {
      templateUrl : '/views/searchresults.html',
      controller : 'resultsController'
    })

    .when('/claimed', {
      templateUrl : '/views/claimed.html',
      controller : 'claimedController'
    })

    .when('/profile', {
      templateUrl : '/views/profile.html',
      controller : 'profileController'
    })

    .when('/chat', {
      templateUrl : '/views/chat.html',
      controller: 'chatController'
    })

    .when('/profilePublic', {
      templateUrl : '/views/publicprofile.html',
      controller : 'publicProfileController'
    })

    .otherwise({
      redirectTo: '/landing'
    });

});
