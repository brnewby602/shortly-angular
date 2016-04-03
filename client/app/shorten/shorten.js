angular.module('shortly.shorten', ['ngMessages'])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {};

  $scope.addLink = function() {
    if ($scope.shortenForm.$valid) {
      Links.addOne($scope.link.url, function() {
        $location.path('links');        
      });
    }
  };
});
