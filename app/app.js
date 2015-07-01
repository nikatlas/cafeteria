'use strict';

// Declare app level module which depends on views, and components
angular.module('me', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])
.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
    $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
        $rootScope.viewParams = current.$$route.params;
        fixPage();
    });
}]);
