angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  $scope.links = [];

  Links.getAll()
    .then(function(links) {
      console.log('links = ' + links);
    });
});
