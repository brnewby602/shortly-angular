angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  $scope.data = {};

  Links.getAll()
    .then(function(links) {
      $scope.data.links = links;
      console.log('links = ' + JSON.stringify(links));
    });
});
