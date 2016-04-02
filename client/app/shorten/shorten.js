angular.module('shortly.shorten', ['ngMessages'])

.controller('ShortenController', function ($scope, $location, Links) {
  // Your code here
  $scope.link = {};

  $scope.addLink = function() {

    console.log('valid: ' + $scope.shortenForm.$valid);

    if ($scope.shortenForm.$valid) {
      Links.addOne($scope.link.url, function() {
        $location.path('links');        
      });

      // $location.path('links');
    }
  

  };
});
