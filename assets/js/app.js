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

    .when('/home', {
      templateUrl : '/views/home.html',
      controller : 'homeController'
    })

    .when('/details', {
      templateUrl : '/views/postdetail.html',
      controller : 'detailController'
    })

    .otherwise({
      redirectTo: '/landing'
    });

});
