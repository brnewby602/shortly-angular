angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  $scope.data = {};

  console.log('inside LinksController');
  Links.getAll()
    .then(function(links) {
      $scope.data.links = links;
      console.log('links = ' + JSON.stringify(links));
    })
    .catch(function(error) {
      console.error('Error retrieving getAll: ' + error);
    });
});
