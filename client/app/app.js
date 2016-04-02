angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'ngRoute',
  'ngMessages'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      authenticate: true,
      templateUrl: 'app/links/links.html',
      controller: 'LinksController'
    })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/links', {
      templateUrl: 'app/links/links.html',
      controller: 'LinksController',
      authenticate: true
    })
    .when('/shorten', {
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController',
      authenticate: true
    })
    .otherwise( {
      authenticate: true,
      redirectTo: '/links'
    }); 
    
    // Your code here

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
  $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers have
  // just been registered and our app is ready however, we want to make sure
  // the user is authorized we listen for when angular is trying to change
  // routes when it does change routes, we then look for the token in
  // localstorage and send that token to the server to see if it is a real
  // user or hasn't expired if it's not valid, we then redirect back to
  // signin/signup

  console.log('******************IM IN HERE**************');
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {

    console.log('next.$$route = ' + JSON.stringify(next.$$route));
    console.log('next.$$route.authenticate = ' + next.$$route.authenticate);
    console.log('isAuth = ' + !Auth.isAuth());
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      console.log('*********** MUST SIGN IN********************');
      $location.path('/signin');
    }
  });
});


















