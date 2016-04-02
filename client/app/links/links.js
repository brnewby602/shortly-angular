angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  // Your code here
  $scope.data = {};

  $scope.filter = '';

  console.log('inside LinksController');
  Links.getAll()
    .then(function(links) {
      links = links.sort(function(a, b) {
        return b.visits - a.visits;
      });
      $scope.data.links = links;
      console.log('links = ' + JSON.stringify(links));
    })
    .catch(function(error) {
      console.error('Error retrieving getAll: ' + error);
    });


  // $scope.canShow = function(index) {

  //   console.log('index = ' + index);
  //   // needs to return boolean
  //   if (filter === '') {
  //     return true;
  //   }

  //   // $scope
  // };
});
