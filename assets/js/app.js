var foodStream = angular.module("foodStream", ['ngRoute']);

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

    .otherwise({
      redirectTo: '/landing'
    });

});
