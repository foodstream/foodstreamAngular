6:03]
detailController
foodStream.controller('detailController', ['$http', '$scope', 'getPostDetail', function($http, $scope, getPostDetail) {
   console.log("detail ctrllr up")
   $scope.detailed = getPostDetail.myFunc();
}]);
