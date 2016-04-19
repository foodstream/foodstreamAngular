//initiate angular app
var foodStream = angular.module("foodStream", ['ngRoute', 'ngFileUpload']);


//this controller shows an icon in the header upon user login and deals with routing in the app header
foodStream.controller('appController', ['$http', '$scope', '$location', 'logged', '$rootScope', function($http, $scope, $location, logged, $rootScope){

  //create a variable that changes when user is logged in for ng-show

$scope.pic = logged.pic;
  // $scope.logged = function($scope, logged){
  //         return logged.pic;
  //       };


  //get login token out of localstorage
  $scope.userToken = localStorage.getItem('token');
  //get userId out of localstorage
  userId = localStorage.getItem('userId');
  $scope.first;
  //check and see if user is logged in...if they are, show a user icon in the header that is a link to the edit-profile page
  $http.get('https://sheltered-wildwood-38449.herokuapp.com/users/'+userId+'.json?token='+$scope.userToken).then(function success(response){
        // console.log(response);
        $scope.first = response.data.first_name;
        $scope.last = response.data.last_name;
        $scope.email = response.data.email;
        $scope.org = response.data.organization;
        $scope.pic = response.data.profile_image
    }, function error(response){
      console.log('GET failed in appController');
  });

  //if a token exists, log the user in
  // if($scope.userToken != null){
  //   $scope.logged = true;
  //   // console.log('logged', $scope.logged)
  // };

  //when you click on the user icon, you go to the edit profile page...
  $scope.goToProfile = function(){
    $location.path('/editProfile');
  };
  //when you click on the foodstram logo, you go home
  $scope.goHome = function(){
    $location.path('/home');
  };

}]);


//this factory does nothing, but it's a dependency of some controller and the site breaks if it isnt here...we should fix that
foodStream.factory('getPostDetail', function() {
  var clickedPost = {};
  return clickedPost;
 });

//this factory checks for a token, and if there is one tells the routing to let the user see more than just login/landing
foodStream.factory('logged', function($rootScope){
 var logged = {}
   var userToken = localStorage.getItem('token');
   if(userToken != null){
     logged.token = userToken;
     logged.pic = true;
   }

 return logged;
});

//this factory is used to find the user's geolocation in lat/long when needed
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


//this module locks down any routes not marked as public access unless there is a token present in the logged factory.
angular.module('foodStream').run(function($rootScope, $location, $route, logged) {
    //tell route provider which routes are public
    var routesOpenToPublic = [];
    angular.forEach($route.routes, function(route, path) {
        // push route onto routesOpenToPublic if it has a truthy publicAccess value
        route.publicAccess && (routesOpenToPublic.push(path));
    });

    //allow user to use non-public routes only if token present
    $rootScope.$on('$routeChangeStart', function(event, nextLoc, currentLoc) {

        var closedToPublic = (-1 === routesOpenToPublic.indexOf($location.path()));
        if(closedToPublic && logged.token == undefined) {
            $location.path('/login');
        };
    });
});



//routing
foodStream.config(function($routeProvider){
  $routeProvider
    .when('/landing', {
      templateUrl : '/views/login.html',
      controller : 'loginController',
      publicAccess : true
    })

    .when('/signUp', {
      templateUrl : '/views/signup.html',
      controller : 'signUpController',
      publicAccess : true
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

    .when('/editPost', {
      templateUrl : '/views/editpost.html',
      controller : 'editPostController'
    })

    .otherwise({
      redirectTo: '/landing'
    });

});
